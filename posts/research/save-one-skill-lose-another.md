---
title: When You Save One Skill, Do You Lose Another?
date: 2026-11-10
---

Large language models are too big for many of the places we would like to run them, such as phones, laptops and small edge devices. The usual fix is compression. Quantization stores the model's weights with fewer bits, for example 4 bits instead of 16. Pruning removes weights, or whole neurons, that seem to matter little. Both make the model smaller and cheaper to run, and both cost some quality.

The cost is not spread evenly. A compressed model can keep its average benchmark score and still lose specific abilities: some survive compression well, and others break early. An average score hides which ones broke.

## An idea from interpretability

Interpretability research has found that some behaviors of a language model are carried by a small, identifiable set of components, called a circuit. Two well-studied examples come from GPT-2 small:

- **Indirect object identification.** Given "When Mary and John went to the store, John gave a drink to", the model should continue with "Mary". [Researchers have traced](https://arxiv.org/abs/2211.00593) the attention heads that make this choice.
- **Greater-than.** Given "The war lasted from the year 1732 to the year 17", the model should continue with a year after 1732. This behavior [also runs through a known set of components](https://arxiv.org/abs/2305.00586).

That suggests a simple strategy for compression. If we know which components a behavior relies on, we can keep those at higher precision and compress the rest harder, so the total memory stays the same. The hope is to preserve the behaviors we care about while concentrating the loss of quality elsewhere.

## The catch

The memory budget is fixed. Every bit spent protecting one behavior's components is a bit taken from somewhere else, so the rest of the model is squeezed harder.

Suppose we protect the heads that track names in the first example. That leaves fewer bits for other components, including those that compare years in the second, which could weaken that behavior. Behaviors may also share components, which makes the overall effect harder to predict. Saving one behavior could quietly damage another.

So the question is not only whether protection works, but what it costs: when we protect the components behind one behavior during compression, does another behavior get worse?

## Why it matters

If protection trades one ability for another, anyone deploying a compressed model needs to know before choosing what to protect. If it does not, protection is a cheap way to keep important behaviors intact on small devices. Either way, the answer would show whether interpretability findings are useful in engineering practice, not only as explanations.

This question is part of a broader research effort I discuss in [a post about my JCDL '26 paper](post.html?p=research/selective-circuit-preservation.md).
