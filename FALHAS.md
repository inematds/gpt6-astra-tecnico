# FALHAS — gpt6-astra-tecnico

| data | o que quebrou | menor correção | prompt \| infra |
|---|---|---|---|
| 2026-09-07 | `gh repo create --source . --push` criou o repo com branch `master`; GitHub Pages recusou com 422 ("The main branch must exist") | `git init -b main` na criação do repo (correção aplicada: `git branch -M main` + push + trocar default_branch) | infra |
