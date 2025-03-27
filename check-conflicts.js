import { execSync } from 'child_process'

try {
  console.log('最新の develop ブランチを取得しています...')
  execSync('git fetch origin develop', { stdio: 'inherit' })

  console.log('マージコンフリクトを確認しています...')
  execSync('git merge --no-commit --no-ff origin/develop', { stdio: 'inherit' })

  console.log('コンフリクトは発生していません。コミットを続行できます。')
} catch (error) {
  console.error('マージコンフリクトが発生しました。解決してからコミットしてください。')
  process.exit(1)
}
