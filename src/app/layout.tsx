import "./globals.css"; // グローバルCSSをインポート
import type { Metadata } from "next"; // Next.jsからMetadata型をインポート
import { AppProvider } from "@/context/AppContext"; // AppContextからAppProviderをインポート

export const metadata: Metadata = {
  title: "techone app", // アプリケーションのタイトル
  description: "techone app", // アプリケーションの説明
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // childrenはReactのノードとして型指定
}>) {
  return (
    // JSXを返す。これはHTMLに似たJavaScriptの拡張構文です。
    <html lang="ja" style={{ backgroundColor: "var(--sub3)"}}>
      {/* HTMLタグに言語属性と背景色のスタイルを設定 */}
      <body>
        <AppProvider>
          {/* AppProviderコンポーネントを使用して、アプリケーションの状態を管理 */}
          {children}
          {/* childrenを表示。これにより、このコンポーネント内に挿入される任意のReactノードが表示される */}
        </AppProvider>
      </body>
    </html>
  );
}
