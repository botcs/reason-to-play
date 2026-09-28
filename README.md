# Reason to Play

Behavioral and Brain Alignment Between Frontier LRMs and Human Game Learners.

**TL;DR:** [Explore the results](https://botcs.github.io/reason-to-play/),
[browse human and model replays](https://botcs.github.io/reason-to-play/catalogue.html),
or [play the games](https://botcs.github.io/reason-to-play/interactive-gameplay.html).

[NeurIPS 2026 paper](https://openreview.net/forum?id=Y1oX1yuaWM) ·
[Research code and workflows](https://github.com/botcs/reason-to-play-src) ·
[Hugging Face dataset](https://huggingface.co/datasets/csbotos/reason-to-play)

The [replay viewer](https://botcs.github.io/reason-to-play/replay.html) shows
gameplay alongside model rationales and the full conversation.

## Local preview

Run `python -m http.server 8000` from this directory and open
[localhost:8000](http://localhost:8000).

Browser engine and viewer source live in
[botcs/browser-game-interpreter](https://github.com/botcs/browser-game-interpreter).
This repository serves the website and its bundles.

## Dataset assets

[data-source.js](data-source.js) pins the
[verified dataset snapshot](https://huggingface.co/datasets/csbotos/reason-to-play/tree/0c674c3ff19b64a55f3fba6d862f5fb828292b74)
used by the catalogue, replays, RDMs and game descriptions. To use a downloaded
dataset, set `datasetRoot` to its HTTP root, for example `"/dataset"`. Setting it
to `null` uses the public CDN (or a `data/` mirror on localhost). Keep the
catalogue and payloads on the same dataset version.

`website-assets/replays/manifest.json` indexes compact replays under
`website-assets/replays/human/` and `website-assets/replays/lrm/`. These retain
displayed trajectories and complete conversations; full research recordings
remain under `behavior/human/` and `behavior/lrm/`. Human catalogue entries use
the `elaborate` prompt condition. RDM metadata and binaries are under
`website-assets/rdms/`.

The dataset's `files` catalogue provides sizes and SHA-256 checksums. Original
human data are available from
[OpenNeuro ds004323 v1.0.0](https://openneuro.org/datasets/ds004323/versions/1.0.0).

## Acknowledgements

This project builds on the VGDL framework and codebase released by
[Cedric Colas et al.](https://github.com/ccolas/language_and_experience)
for "Language and Experience: A Computational Model of Social Learning in Complex Tasks".
The Browser Game Interpreter (BGI) is a JavaScript re-implementation of the
VGDL engine for interactive visualization and replay.

## License

MIT License. See [LICENSE](LICENSE) for details.
