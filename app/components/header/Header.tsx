import { useStore } from '@nanostores/react';
import { ClientOnly } from 'remix-utils/client-only';
import { chatStore } from '~/lib/stores/chat';
import { classNames } from '~/utils/classNames';
import { HeaderActionButtons } from './HeaderActionButtons.client';
import { ChatDescription } from '~/lib/persistence/ChatDescription.client';

export function Header() {
  const chat = useStore(chatStore);

  return (
    <header
      className={classNames(
        'flex items-center px-4 h-[var(--header-height)] relative',
        'bg-gradient-to-r from-gray-950/90 via-gray-900/80 to-gray-950/90',
        'backdrop-blur-xl',
        {
          'border-b border-transparent': !chat.started,
          'border-b border-cyan-500/20': chat.started,
        }
      )}
    >
      {/* Holographic bottom border glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,212,255,0.03)_2px,rgba(0,212,255,0.03)_4px)]" />
      </div>
      
      <div className="flex items-center gap-3 z-logo text-bolt-elements-textPrimary cursor-pointer">
        <div className="i-ph:sidebar-simple-duotone text-xl text-cyan-400 hover:text-cyan-300 transition-all hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.6)]" />
        <a href="/" className="text-2xl font-semibold flex items-center group">
          {/* JARVIS-style Brainiac IDE logo */}
          <span className="font-['Orbitron'] font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-500 group-hover:from-cyan-300 group-hover:via-cyan-200 group-hover:to-cyan-400 transition-all drop-shadow-[0_0_10px_rgba(0,212,255,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(0,212,255,0.7)]">
            BRAINIAC
          </span>
          <span className="font-['Rajdhani'] ml-2 text-cyan-500/70 font-light tracking-widest text-lg">IDE</span>
        </a>
      </div>
      
      {chat.started && (
        <>
          <span className="flex-1 px-4 truncate text-center">
            <span className="font-['Rajdhani'] text-cyan-300/90 tracking-wide drop-shadow-[0_0_5px_rgba(0,212,255,0.3)]">
              <ClientOnly>{() => <ChatDescription />}</ClientOnly>
            </span>
          </span>
          <ClientOnly>
            {() => (
              <div className="relative">
                <HeaderActionButtons chatStarted={chat.started} />
              </div>
            )}
          </ClientOnly>
        </>
      )}
      
      {/* Corner accent decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-500/40" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-500/40" />
    </header>
  );
}
