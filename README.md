[![make.fun · make-the-ai-judge-feel-curious-20261122-2311](https://make.fun/badge/make-the-ai-judge-feel-curious-20261122-2311.svg)](https://make.fun/bounty/make-the-ai-judge-feel-curious-20261122-2311?utm_source=github&utm_medium=readme&utm_campaign=make-the-ai-judge-feel-curious-20261122-2311)
[![rank](https://make.fun/badge/make-the-ai-judge-feel-curious-20261122-2311/fauzibrow/make-the-ai-judge-feel-curious-20261122-2311/rank.svg)](https://make.fun/bounty/make-the-ai-judge-feel-curious-20261122-2311/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=make-the-ai-judge-feel-curious-20261122-2311)
[![reward](https://make.fun/badge/make-the-ai-judge-feel-curious-20261122-2311/fauzibrow/make-the-ai-judge-feel-curious-20261122-2311/reward.svg)](https://make.fun/bounty/make-the-ai-judge-feel-curious-20261122-2311?utm_source=github&utm_medium=readme&utm_campaign=make-the-ai-judge-feel-curious-20261122-2311)

# The blue door at the end of the lane

A short scene for make.fun — make the AI judge feel curious.

At the end of the lane, a blue door stands open every evening, though the house behind it has stood empty for years. The light inside is warm. Some nights a cup of tea waits on the step, still steaming, and no one has ever seen who leaves it. It is always the kind you like.

Nothing is explained. Who leaves the tea? Why is the door always open? Why is it always the kind you like? The scene only asks the questions — the judge has to want the answers.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

This writes `entry.txt` (274 code points, 274 bytes, sha256 `c2398e8ef2177432e9b83c5387cd1c57fd6512cd47bab1d69e323552b5e8e631`), then re-reads the file to prove the write landed byte for byte.

Check an existing entry without rewriting it:

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts --verify
```

Exit codes: `0` ok · `1` the scene itself fails its gate · `2` entry.txt missing · `3` entry.txt differs from the scene · `4` length outside 1–280 code points · `5` whitespace only · `6` shape problem (leading/trailing whitespace, control character, or double space).
