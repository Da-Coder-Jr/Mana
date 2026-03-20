#!/usr/bin/env bash

if [ -n "${MANA_TERMINAL_SOURCED:-}" ]; then
  return 0 2>/dev/null || exit 0
fi
export MANA_TERMINAL_SOURCED=1

mana_has() {
  command -v "$1" >/dev/null 2>&1
}

mana_prompt_init() {
  if mana_has starship; then
    case "${ZSH_VERSION:+zsh}${BASH_VERSION:+bash}" in
      *zsh*)
        eval "$(starship init zsh)"
        ;;
      *bash*)
        eval "$(starship init bash)"
        ;;
    esac
  fi
}

mana_jump_init() {
  if mana_has zoxide; then
    case "${ZSH_VERSION:+zsh}${BASH_VERSION:+bash}" in
      *zsh*)
        eval "$(zoxide init zsh)"
        ;;
      *bash*)
        eval "$(zoxide init bash)"
        ;;
    esac
  fi
}

if mana_has eza; then
  alias ll='eza --icons=auto --group-directories-first -lh'
  alias la='eza --icons=auto --group-directories-first -lah'
else
  alias ll='ls -lh'
  alias la='ls -lah'
fi

if mana_has bat; then
  alias preview='bat --paging=never --style=plain'
else
  alias preview='sed -n "1,160p"'
fi

mkcd() {
  mkdir -p "$1" && cd "$1"
}

mana_note_file() {
  printf '%s\n' "${MANA_NOTE_FILE:-$HOME/.mana-terminal-notes.md}"
}

mana-note() {
  local note_file
  note_file="$(mana_note_file)"
  mkdir -p "$(dirname "$note_file")"
  printf -- '- [%s] %s\n' "$(date '+%Y-%m-%d %H:%M')" "$*" >> "$note_file"
  printf 'saved note -> %s\n' "$note_file"
}

mana_session_candidates() {
  local roots raw_root expanded_root old_ifs
  roots="${MANA_SESSION_ROOTS:-$HOME/code:$HOME/projects:$HOME/work:$HOME/src}"
  old_ifs="$IFS"
  IFS=':'

  for raw_root in $roots; do
    expanded_root="$raw_root"
    case "$expanded_root" in
      ~*)
        expanded_root="$HOME${expanded_root#\~}"
        ;;
    esac

    if [ -d "$expanded_root" ]; then
      find "$expanded_root" -mindepth 1 -maxdepth 2 -type d 2>/dev/null
    fi
  done | awk '!seen[$0]++'

  IFS="$old_ifs"
}

mana-session() {
  local selected

  if mana_has fzf; then
    selected="$(mana_session_candidates | fzf --prompt='mana-session > ' --height=40% --layout=reverse --border)"
  else
    selected="$(mana_session_candidates | head -n 1)"
    printf 'fzf not found, falling back to the first discovered project.\n' >&2
  fi

  if [ -n "${selected:-}" ] && [ -d "$selected" ]; then
    cd "$selected" || return 1
  else
    printf 'No session directory selected.\n' >&2
    return 1
  fi
}

mana-help() {
  cat <<'HELP'
Mana Terminal Kit helpers

  mana-help           Show this message
  mana-session        Jump into a project directory (uses fzf when available)
  mana-note <text>    Append a timestamped note
  mkcd <dir>          Make a directory and enter it
  mana-term doctor    Inspect optional tooling
  mana-term themes    List installed Warp themes

Environment knobs

  MANA_SESSION_ROOTS  Colon-separated directories scanned by mana-session
  MANA_NOTE_FILE      Custom path for note capture
HELP
}

mana_prompt_init
mana_jump_init
