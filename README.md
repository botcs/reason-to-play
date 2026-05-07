# Interactive Replay Viewer

Self-contained, offline browser application for viewing LLM and human
gameplay replays on VGDL games.

## Usage

Open `catalogue.html` in any modern browser (Chrome, Firefox, Safari).
No server or internet connection required -- everything is bundled.

## Contents

- `catalogue.html` -- main entry point; browse and filter all replays
- `replay.html` -- detailed single-replay viewer with step-by-step
  playback, reasoning traces, and full conversation history
- `interactive-gameplay.html` -- play the games yourself using the
  same VGDL engine the LLM agents interact with
- `catalogue-data/` -- embedded replay data (base64-encoded gzip)
- `fonts/` -- locally bundled web fonts
