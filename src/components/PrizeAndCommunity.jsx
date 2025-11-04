import React from 'react';
import { Trophy, Wallet, Users } from 'lucide-react';

function StatCard({ icon: Icon, title, value, description }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-white/[0.02] p-6 shadow-[0_0_30px_rgba(16,185,129,0.12)] transition-all hover:shadow-[0_0_45px_rgba(16,185,129,0.25)]">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/10 blur-2xl" />
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="text-sm text-gray-300">{title}</div>
          <div className="text-2xl font-bold text-emerald-400">{value}</div>
        </div>
      </div>
      {description && (
        <p className="mt-3 text-sm text-gray-400">{description}</p>
      )}
    </div>
  );
}

function ContestantCard({ name, country, bio, color }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 hover:border-emerald-500/40 transition-colors">
      <div className="flex items-center gap-4">
        <div
          className="h-12 w-12 flex items-center justify-center rounded-full text-xl"
          style={{ backgroundColor: color }}
        >
          🚙
        </div>
        <div>
          <div className="text-white font-semibold">{name}</div>
          <div className="text-sm text-gray-400">{country}</div>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-300">{bio}</p>
      <button className="mt-4 w-full rounded-xl border border-emerald-500/60 px-4 py-2 text-emerald-400 hover:bg-emerald-500 hover:text-gray-900 transition-colors">
        Vote Placeholder
      </button>
    </div>
  );
}

export default function PrizeAndCommunity() {
  return (
    <section id="prizes" className="bg-[#0A0A0E]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            THE ROAD TO $50,000: Prize Pool Breakdown
          </h2>
          <p className="mt-3 text-gray-300">
            Win big for exploring bigger. Compete, create, and let the community choose who takes the crown.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6" id="features">
          <StatCard
            icon={Trophy}
            title="Prize Money"
            value="$50,000 USD"
            description="The Grand Prize for the champion traveler."
          />
          <StatCard
            icon={Wallet}
            title="Total Pool"
            value="Over $100,000"
            description="Includes gear, sponsorships, and runner-up rewards."
          />
          <StatCard
            icon={Users}
            title="Community Value"
            value="Voting Power"
            description="Your voice decides the final selection."
          />
        </div>

        <div id="community" className="mt-20">
          <div className="max-w-3xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              CHOOSE YOUR CHAMPION
            </h3>
            <p className="mt-3 text-gray-300">
              Community members vote for their preferred traveller based on their content, engagement, and journey documentation directly within the Africa by Road application.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ContestantCard
              name="Ama N."
              country="Ghana"
              bio="Overland enthusiast capturing market towns and coastlines with a storyteller's eye."
              color="rgba(16,185,129,0.25)"
            />
            <ContestantCard
              name="Thabo K."
              country="South Africa"
              bio="Mechanic-turned-videographer, charting 4x4 trails from the Karoo to Kruger."
              color="rgba(16,185,129,0.18)"
            />
            <ContestantCard
              name="Aisha R."
              country="Morocco"
              bio="Desert cruiser documenting Atlas passes and Saharan nights in minimalist frames."
              color="rgba(16,185,129,0.22)"
            />
          </div>

          <div className="mt-8">
            <a
              href="#community"
              className="inline-flex items-center justify-center rounded-xl border border-emerald-500/70 px-6 py-3 text-emerald-400 hover:text-emerald-300 hover:border-emerald-400 transition-colors"
            >
              View Community Leaderboard
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
