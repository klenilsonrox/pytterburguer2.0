import Header from "@/components/Header";
import "./globals.css";
import { DadosProvider } from "./contexts/DadosContext";


export const metadata = {
  title: "Pytter Burguer",
  description: "Sua melhor opção de sanduiches em Bambuí-mg",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <link rel="shortcut icon" href="https://cdn-icons-png.flaticon.com/128/5787/5787016.png" type="image/x-icon"></link>
      <body >
        <DadosProvider>
        <Header />
        {children}
        </DadosProvider>

        </body>
    </html>
  );
}
