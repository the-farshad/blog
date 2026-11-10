---
title: Can LLMs Write a Complete Data Science Pipeline? Our AutoML 2025 Paper
date: 2025-11-10
---

Our paper, "A Preliminary Evaluation of Large Language Models for Data Science Code Generation," appeared in the non-archival track of AutoML 2025, the International Conference on Automated Machine Learning. You can [read it on OpenReview](https://openreview.net/pdf?id=U0aJinoLlS).

## The question

AutoML tools let domain scientists with little machine learning background build strong models, but someone still has to write the code around them. That is hard in fields where few people program. LLMs keep getting better at writing code, so we asked: can they reliably write a complete, working machine learning pipeline for a basic data science task?

## The test

We gave more than 30 commercial and open-weight models the same task: write one self-contained Python script for the Wine Quality dataset that

- loads, summarizes, explores and preprocesses the data
- trains Decision Tree, Random Forest and SVM classifiers with cross-validation
- tunes their hyperparameters
- reports accuracy, F1-score and confusion matrices, with plots of the data and the results

Each model had up to three attempts. When a script failed, its error message went back to the model as feedback. We graded the code and the plots separately, from A to F, and lowered the code grade by one level when a model needed feedback.

## What we found

- **A few models got it right on the first try.** Claude Sonnet 4 and Gemini 2.5 Pro earned an A for both code and plots without any feedback. Among open-weight models, Phi-4 Reasoning wrote A-grade code on its first attempt.
- **Bigger was not always better.** Smaller models such as Phi-4 and Gemma 3 outperformed larger ones such as LLaMA 4 in several cases. The LLaMA 4 variants and DeepSeek R1 were sometimes more error-prone despite their size.
- **Feedback helped some models.** Claude 3.7 Sonnet, Gemini 2.0 Flash and GPT-4o fixed their errors over several attempts.
- **Many still failed.** Thirteen models, including O3 Mini, CodeLlama 70B and WizardCoder, produced no working code after three attempts, and some models called functions that do not exist.

## The takeaway

LLMs are getting close to practical use for parts of the data science workflow, especially for writing a baseline machine learning pipeline. But results vary widely between models, so size alone is not a good guide for choosing one.
