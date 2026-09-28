# Reason to Play

Behavioral and Brain Alignment Between Frontier LRMs and Human Game Learners.

**Project page:** [Reason to Play](https://botcs.github.io/reason-to-play/)

## Interactive Tools

- **Replay Catalogue** (`catalogue.html`) -- browse all human and LLM gameplay replays
- **Replay Viewer** (`replay.html`) -- step through replays with reasoning traces and full conversation history
- **Play the Games** (`interactive-gameplay.html`) -- try the VGDL games yourself in the browser

For a local preview, run `python -m http.server 8000` from this directory and
open `http://localhost:8000`.

## Source Code

The public research code is maintained in
[botcs/reason-to-play-src](https://github.com/botcs/reason-to-play-src).

## Paper and Data

- [NeurIPS 2026 paper](https://openreview.net/forum?id=Y1oX1yuaWM)
- [Paper on Hugging Face](https://huggingface.co/papers/2605.08019)
- [Original human data: OpenNeuro ds004323 v1.0.0](https://openneuro.org/datasets/ds004323/versions/1.0.0)
- [Dataset release discussion](https://github.com/botcs/reason-to-play-src/issues/1)

The Data navigation link requires a public Hugging Face dataset. To enable it, set
`huggingFaceDataset` in `index.html` to its verified `owner/repository` ID and
check that the page is accessible without authentication. The Hugging Face
paper link is already live; it is separate from the dataset link.

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
