# Reason to Play

Behavioral and Brain Alignment Between Frontier LRMs and Human Game Learners.

**Project page:** [Reason to Play](https://botcs.github.io/reason-to-play/)

## Interactive Tools

- **Interactive Catalogue** (`catalogue.html`) -- browse all human and LLM gameplay replays
- **Replay Viewer** (`replay.html`) -- step through replays with reasoning traces and full conversation history
- **Play the Games** (`interactive-gameplay.html`) -- try the VGDL games yourself in the browser

For a local preview, run `python -m http.server 8000` from this directory and
open `http://localhost:8000`.

## Source Code

The public research code is maintained in
[botcs/reason-to-play-src](https://github.com/botcs/reason-to-play-src).

## Paper and Data

- [NeurIPS 2026 paper](https://openreview.net/forum?id=Y1oX1yuaWM)
- [Dataset on Hugging Face](https://huggingface.co/datasets/csbotos/reason-to-play)
- [Paper on Hugging Face](https://huggingface.co/papers/2605.08019)
- [Original human data: OpenNeuro ds004323 v1.0.0](https://openneuro.org/datasets/ds004323/versions/1.0.0)
- [Dataset release discussion](https://github.com/botcs/reason-to-play-src/issues/1)

The Data navigation link opens the derivative dataset. Its `files` catalogue
lists every released payload with verified sizes and SHA-256 checksums.

Browser engine and viewer source are maintained in
[botcs/browser-game-interpreter](https://github.com/botcs/browser-game-interpreter).
The bundles in this repository serve the project website. Research workflows
and the canonical citation are documented in
[botcs/reason-to-play-src](https://github.com/botcs/reason-to-play-src).

## Acknowledgements

This project builds on the VGDL framework and codebase released by
[Cedric Colas et al.](https://github.com/ccolas/language_and_experience)
for "Language and Experience: A Computational Model of Social Learning in Complex Tasks".
The Browser Game Interpreter (BGI) is a JavaScript re-implementation of the
VGDL engine for interactive visualization and replay.

## License

MIT License. See [LICENSE](LICENSE) for details.

## Dataset assets

`data-source.js` pins the published Hugging Face files used by the catalogue,
replays, RDMs and replay-linked game descriptions. To serve a downloaded dataset,
set `datasetRoot` to its HTTP root, for example `"/dataset"`. Setting it to `null`
uses the public CDN (or a `data/` mirror on localhost). Keep the Hugging Face
commit pinned so the catalogue and payloads come from the same version.

The browser replay index is `website-assets/replays/manifest.json`; it references
compact copies under `website-assets/replays/human/` and
`website-assets/replays/lrm/`. These retain the displayed trajectories and complete
conversations while omitting engine and raw-input fields unused by the browser.
Canonical research recordings remain under `behavior/human/` and `behavior/lrm/`.
RDM metadata and binary pairs live under `website-assets/rdms/`. Human catalogue
entries select the `elaborate` prompt condition.

The website uses the
[verified dataset snapshot](https://huggingface.co/datasets/csbotos/reason-to-play/tree/0c674c3ff19b64a55f3fba6d862f5fb828292b74)
pinned in `data-source.js`.
