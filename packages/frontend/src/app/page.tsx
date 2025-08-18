import { Button } from '@/components/shadcn/button';
import { ThemeToggleButton } from '@/components/theme/ThemeToggleButton';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">SSM</h1>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggleButton />
              <Button variant="ghost" asChild>
                <Link href="/login">ログイン</Link>
              </Button>
              <Button asChild>
                <Link href="/register">サインアップ</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Smart Message Manager
              </h1>
              <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
                SlackとAIを組み合わせた効率的なメッセージ管理システムです。チームのコミュニケーションを整理し、
                生産性を向上させましょう。
              </p>
              <p className="mt-6 text-xl text-red-400 font-medium max-w-3xl mx-auto">
                ※これはポートフォリオ用に作成されたものであり、実際にご利用される際は様々な制限があります。
                また、永続的な利用を行うことはできません
              </p>
              <div className="mt-10 flex justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/register">無料で始める</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/login">ログインする</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground">主な機能</h2>
              <p className="mt-4 text-lg text-muted-foreground">あなたのワークフローを劇的に改善する機能群</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-background rounded-lg shadow-sm border">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-4">リアルタイムダッシュボード</h3>
                <p className="text-muted-foreground">
                  メッセージの概要、レポート、分析データをリアルタイムで確認。
                  データドリブンな意思決定をサポートします。
                </p>
              </div>

              <div className="text-center p-8 bg-background rounded-lg shadow-sm border">
                <div className="text-4xl mb-4">⚙️</div>
                <h3 className="text-xl font-semibold mb-4">柔軟な設定管理</h3>
                <p className="text-muted-foreground">
                  チームに合わせた設定のカスタマイズ。通知、権限、 ワークフローを自由に調整できます。
                </p>
              </div>

              <div className="text-center p-8 bg-background rounded-lg shadow-sm border">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold mb-4">簡単インストール</h3>
                <p className="text-muted-foreground">
                  数クリックでセットアップ完了。既存システムとの 連携もスムーズに行えます。
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">今すぐ始めましょう</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Smart Message Managerの全機能は全て無料で利用できます。
              アンインストールはSlackワークスペースからAppを削除するだけです。
            </p>
            <Button size="lg" asChild>
              <Link href="/register">Slackにインストールする</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Smart Message Manager. Created by Murakami Hiroki - Portfolio Project
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
