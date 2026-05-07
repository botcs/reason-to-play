# Reason to Play

Behavioral and Brain Alignment Between Frontier LRMs and Human Game Learners.

**Project page:** https://botcs.github.io/reason-to-play/

## Interactive Tools

- **Replay Catalogue** (`catalogue.html`) -- browse all human and LLM gameplay replays
- **Replay Viewer** (`replay.html`) -- step through replays with reasoning traces and full conversation history
- **Play the Games** (`interactive-gameplay.html`) -- try the VGDL games yourself in the browser

Open any `.html` file directly in a modern browser -- no server required.

## Source Code

The `source-code/` directory contains the LLM evaluation pipeline, VGDL game engine,
system prompts, game definitions, and experiment sweep configurations.
See `source-code/README.md` for details.

## Acknowledgements

This project builds on the VGDL framework and codebase released by
[Cedric Colas et al.](https://github.com/ccolas/language_and_experience)
for "Language and Experience: A Computational Model of Social Learning in Complex Tasks".
The Browser Game Interpreter (BGI) is a JavaScript re-implementation of the
VGDL engine for interactive visualization and replay.

## License

MIT License. See [LICENSE](LICENSE) for details.
