import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { useEffect } from 'react';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ServerStatus from '@/components/ServerStatus';
import Rules from '@/components/Rules';
import Store from '@/components/Store';
import Footer from '@/components/Footer';
import NotFound from '@/pages/not-found';
import KitsPage from '@/pages/kits';
import PlayersPage from '@/pages/players';
import PlayerProfilePage from '@/pages/player-profile';
import LivePlayers from '@/components/LivePlayers';
import ServerSongPlayer from '@/components/ServerSongPlayer';

const queryClient = new QueryClient();

function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0f] text-foreground font-sans">
      <ServerSongPlayer />
      <Navbar />
      <Hero />
      <Features />
      <ServerStatus />
      <LivePlayers />
      <Rules />
      <Store />
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/kits" component={KitsPage} />
      <Route path="/players" component={PlayersPage} />
      <Route path="/player/:username" component={PlayerProfilePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
