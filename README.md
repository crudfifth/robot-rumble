## **プリコミット時のスクリプト動作について**

本プロジェクトでは、**プリコミット時（`git commit` 実行時）に自動的に以下のスクリプトが実行** されます。これにより、コードの品質チェックやコンフリクトの事前確認を行い、コミットの安定性を向上させます。

### **1. 実行されるスクリプト**
プリコミット時には `simple-git-hooks` によって、以下のスクリプトが順番に実行されます。

#### **① lint-staged**
`lint-staged` により、 **ステージングされたファイル** に対して以下の処理が実行されます。

```json
"lint-staged": {
  "*.{js,vue,ts}": [
    "eslint --fix --config ./config/eslint.config.js",
    "prettier --write",
    "vitest --config ./config/vitest.config.ts --run --reporter verbose --coverage --passWithNoTests"
  ]
}
```

| スクリプト | 説明 |
|------------|------|
| `eslint --fix` | ESLint によるコード解析・自動修正 |
| `prettier --write` | Prettier によるコードフォーマット |
| `vitest` | Vitest による単体テスト（`--passWithNoTests` によりテストファイルがない場合でもエラーにしない） |

#### **② コンフリクトチェック**
`check-conflicts.js` により、 **リモートの develop ブランチと現在の作業ブランチの間にコンフリクトが発生するか** を事前にチェックします。

```json
"simple-git-hooks": {
  "pre-commit": "npx lint-staged && npx check-conflicts"
}
```

| スクリプト | 説明 |
|------------|------|
| `npx lint-staged` | `lint-staged` によるコードチェック・フォーマット・テスト |
| `npx check-conflicts` | `check-conflicts.js` によりコンフリクトの事前確認 |

### **2. コンフリクトチェック**
#### **2.1. コンフリクトが発生した場合**
`check-conflicts.js` によってコンフリクトが検出されると、エラーメッセージが表示され、コミットが中断されます。その場合、手動でコンフリクトを解消してから再度コミットを実行してください。

#### **2.2. コンフリクトが発生しない場合**
コンフリクトが発生しない場合、コミットは正常に実行されます。
