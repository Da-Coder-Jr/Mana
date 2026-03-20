# Mana Terminal Kit

Mana Terminal Kit is a **clone-and-run terminal upgrade repo**: it installs a cozy modern shell setup, ships custom Warp themes, wires in a polished Starship prompt preset, and adds a handful of quality-of-life shell commands so your terminal feels more like a lightweight productivity cockpit.

It is **not** a terminal emulator. Instead, it gives you a fast way to make your existing shell feel more modern, especially if you're using **Warp**, **zsh**, or **bash**.

## What you get

- **Two custom Warp themes** in the same YAML-style format used by the official Warp themes repository.
- **A tuned Starship prompt preset** with git, runtime, directory, and command-duration context.
- **Shell helpers** for project jumping, note capture, quick directory creation, and a small “doctor” command.
- **Idempotent install script** that can be re-run safely.
- **Optional power-ups** for `fzf`, `zoxide`, `eza`, and `bat` if you already have them installed.

## Quick start

```bash
git clone <your-repo-url>
cd Mana
chmod +x install.sh
./install.sh
```

Then either restart your shell or run one of the following:

```bash
source ~/.bashrc
# or
source ~/.zshrc
```

## Installed files

The installer copies repo assets into these locations:

- `~/.config/mana-terminal/cozy-shell.sh`
- `~/.config/mana-terminal/starship.toml`
- `~/.local/bin/mana-term`
- `~/.warp/themes/mana-cozy-modern.yaml`
- `~/.warp/themes/mana-midnight-moss.yaml`

It also appends a small managed block to your shell rc file so the configuration loads automatically.

## Commands after install

### `mana-help`
Shows the built-in shortcuts and helper functions.

### `mana-session`
Jump into a project directory from your session roots. If `fzf` is installed, it gives you an interactive picker.

Set custom roots with a colon-separated environment variable:

```bash
export MANA_SESSION_ROOTS="$HOME/code:$HOME/projects:$HOME/work"
```

### `mana-note buy tea`
Append a timestamped line to your terminal notes file.

### `mana-term doctor`
Checks whether optional tools like `starship`, `fzf`, `zoxide`, `eza`, and `bat` are available.

### `mkcd new-folder`
Create a directory and jump into it in one command.

## Optional tools worth installing

Mana Terminal Kit works without these, but it feels better with them:

- [`starship`](https://starship.rs/) for the prompt
- [`fzf`](https://github.com/junegunn/fzf) for fuzzy project switching
- [`zoxide`](https://github.com/ajeetdsouza/zoxide) for smarter directory jumping
- [`eza`](https://github.com/eza-community/eza) for modern directory listings
- [`bat`](https://github.com/sharkdp/bat) for pretty file previews

## Warp themes

The included Warp themes live in `themes/warp/` and are copied into `~/.warp/themes/` during install so they appear in Warp's theme picker.

Included themes:

- `mana-cozy-modern`
- `mana-midnight-moss`

## Uninstall

Remove the installed files and delete the `mana-terminal` block from your shell rc file:

```bash
rm -rf ~/.config/mana-terminal
rm -f ~/.local/bin/mana-term
rm -f ~/.warp/themes/mana-cozy-modern.yaml
rm -f ~/.warp/themes/mana-midnight-moss.yaml
```

Then open your `~/.bashrc` or `~/.zshrc` and remove the block between:

```bash
# >>> mana-terminal >>>
# <<< mana-terminal <<<
```

## Repo structure

```text
.
├── bin/
│   └── mana-term
├── config/
│   └── starship.toml
├── install.sh
├── shell/
│   └── cozy-shell.sh
└── themes/
    └── warp/
        ├── mana-cozy-modern.yaml
        └── mana-midnight-moss.yaml
```
