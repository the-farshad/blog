---
title: Can We Compress Language Models Without Losing Their Skills? My JCDL '26 Paper
date: 2026-10-27
---

My Doctoral Consortium paper, "Selective Circuit Preservation During Compression of Large Language Models for Edge Deployment," is out in the proceedings of JCDL '26, the 2026 ACM/IEEE Joint Conference on Digital Libraries. It is open access under CC BY 4.0, and you can [read it on the ACM Digital Library](https://doi.org/10.1145/3805696.3847134).

## The problem

To run a language model on an edge device, you have to fit it into tight memory and latency budgets. The standard tools are pruning and quantization. Both keep overall quality scores high, but they are capability-agnostic: they minimize average error, not the loss of any particular skill.

The damage that follows is uneven, and the aggregate numbers hide it:

- Pruned models can lose a lot on knowledge-intensive tasks at modest sparsity, while perplexity barely moves.
- The harm quantization does to factual recall is amplified in the smaller models of a family, which are exactly the ones edge devices need.
- Safety behavior can sit in as little as about 3% of the parameters, so compression that is blind to it can remove it as a side effect.

So after compressing a model to fit a device, there is no principled way to say which capabilities it still has.

## The idea

Mechanistic interpretability studies circuits: small subnetworks of attention heads, neurons and connections that implement an identifiable behavior. My dissertation asks whether compression can become capability-aware by treating circuits as the unit to protect. The proposed pipeline has four stages:

1. **Localize** the circuits behind a fixed capability profile, a benchmarked set of skills the deployed model must keep.
2. **Protect** the parameters those circuits use, keeping them unpruned or at higher precision while the rest of the model is compressed aggressively.
3. **Realize** that protection at a granularity the hardware can execute, such as quantization blocks or structured sparsity groups, instead of scattered exceptions.
4. **Verify** two things afterward: behavioral retention (does the compressed model still perform the capability?) and mechanistic retention (is the circuit still causally faithful inside it?). A capability counts as preserved only when both hold.

The pipeline will be compared with capability-agnostic baselines (SparseGPT, Wanda, GPTQ and AWQ) at an equal memory budget.

## The gap and the first experiment

A targeted review of the compression and interpretability literature, current as of August 2026, found no published method that combines all four of these:

- protecting several capabilities at once
- applying pruning and quantization together
- implementing that protection in a form the hardware can execute, and measuring it on a real device
- testing mechanistically whether the protected capabilities survived

The first experiment tests the premises the pipeline rests on. It uses GPT-2 small and its published indirect-object-identification (IOI) circuit, and quantizes the model to 8, 4 and 3 bits under five conditions:

- quantizing everything
- sparing the circuit
- concentrating quantization on the circuit
- sparing a random set of the same size
- sparing a statistically salient set of the same size, where practical

Task performance and circuit faithfulness are measured before and after each one. The paper presents the design of this experiment, not results.

## Open questions

- Circuits are irregular (a few attention heads and the edges between them), but hardware executes regular blocks. How can one be mapped onto the other without protecting far more of the model than the circuit itself?
- Circuits are found for tasks, but capabilities such as factual recall and safe refusal are broader than tasks. Do they decompose into circuits at all?
- Faithfulness is measured by ablating everything outside the circuit, and compression changes that remainder too. How do you tell real damage to the circuit from a measurement artifact?

The paper includes references for each of these points. If you work on compression or interpretability, I'd like to hear your thoughts on these questions.
