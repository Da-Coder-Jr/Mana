#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_HOME="${XDG_CONFIG_HOME:-$HOME/.config}"
BIN_HOME="${XDG_BIN_HOME:-$HOME/.local/bin}"
MANA_HOME="$CONFIG_HOME/mana-terminal"
WARP_THEME_HOME="$HOME/.warp/themes"
RC_MARK_START="# >>> mana-terminal >>>"
RC_MARK_END="# <<< mana-terminal <<<"

log() {
  printf '[mana-install] %s\n' "$1"
}

pick_rc_file() {
  local shell_name
  shell_name="${SHELL:-}"
  shell_name="${shell_name##*/}"

  case "$shell_name" in
    zsh)
      printf '%s\n' "$HOME/.zshrc"
      ;;
    bash)
      printf '%s\n' "$HOME/.bashrc"
      ;;
    *)
      if [ -f "$HOME/.zshrc" ]; then
        printf '%s\n' "$HOME/.zshrc"
      else
        printf '%s\n' "$HOME/.bashrc"
      fi
      ;;
  esac
}

strip_managed_block() {
  local file="$1"
  local temp_file

  temp_file="$(mktemp)"
  if [ -f "$file" ]; then
    awk -v start="$RC_MARK_START" -v end="$RC_MARK_END" '
      $0 == start { skipping = 1; next }
      $0 == end { skipping = 0; next }
      skipping != 1 { print }
    ' "$file" > "$temp_file"
    mv "$temp_file" "$file"
  else
    : > "$file"
    rm -f "$temp_file"
  fi
}

append_managed_block() {
  local file="$1"

  strip_managed_block "$file"
  cat >> "$file" <<BLOCK
$RC_MARK_START
export PATH="$BIN_HOME:\$PATH"
export STARSHIP_CONFIG="$MANA_HOME/starship.toml"
[ -f "$MANA_HOME/cozy-shell.sh" ] && . "$MANA_HOME/cozy-shell.sh"
$RC_MARK_END
BLOCK
}

main() {
  local rc_file
  rc_file="$(pick_rc_file)"

  mkdir -p "$MANA_HOME" "$BIN_HOME" "$WARP_THEME_HOME"

  install -m 0644 "$REPO_ROOT/shell/cozy-shell.sh" "$MANA_HOME/cozy-shell.sh"
  install -m 0644 "$REPO_ROOT/config/starship.toml" "$MANA_HOME/starship.toml"
  install -m 0755 "$REPO_ROOT/bin/mana-term" "$BIN_HOME/mana-term"
  install -m 0644 "$REPO_ROOT/themes/warp/mana-cozy-modern.yaml" "$WARP_THEME_HOME/mana-cozy-modern.yaml"
  install -m 0644 "$REPO_ROOT/themes/warp/mana-midnight-moss.yaml" "$WARP_THEME_HOME/mana-midnight-moss.yaml"

  append_managed_block "$rc_file"

  log "Installed shell config into $MANA_HOME"
  log "Installed helper binary into $BIN_HOME/mana-term"
  log "Installed Warp themes into $WARP_THEME_HOME"
  log "Updated shell rc file: $rc_file"

  if command -v starship >/dev/null 2>&1; then
    log "starship detected: prompt preset will activate in new shells"
  else
    log "starship not found: install it to enable the modern prompt"
  fi

  log "Restart your shell or source $rc_file to begin using mana-help and mana-session"
}

main "$@"
