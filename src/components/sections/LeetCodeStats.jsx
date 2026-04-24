import React, { useEffect, useState, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import ScrambledText from '../ui/ScrambledText';

const LEETCODE_USERNAME = 'ankitsingh794';

const FALLBACK = {
  solved: { total: 218, easy: 64, medium: 130, hard: 24 },
  contest: { rating: 1820, attended: 8, topPercent: 6.99, ranking: 59383, history: [] },
};

const totalProblems = { easy: 850, medium: 1800, hard: 800 };

const LeetCodeStats = () => {
  const containerRef = useRef(null);
  const [stats, setStats] = useState(FALLBACK.solved);
  const [contest, setContest] = useState(FALLBACK.contest);
  const [loaded, setLoaded] = useState(false);

  // Fetch live data
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [solvedRes, contestRes] = await Promise.allSettled([
          fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`),
          fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/contest`),
        ]);

        if (solvedRes.status === 'fulfilled' && solvedRes.value.ok) {
          const data = await solvedRes.value.json();
          setStats({
            total: data.solvedProblem || FALLBACK.solved.total,
            easy: data.easySolved || FALLBACK.solved.easy,
            medium: data.mediumSolved || FALLBACK.solved.medium,
            hard: data.hardSolved || FALLBACK.solved.hard,
          });
        }

        if (contestRes.status === 'fulfilled' && contestRes.value.ok) {
          const data = await contestRes.value.json();
          setContest({
            rating: Math.round(data.contestRating || FALLBACK.contest.rating),
            attended: data.contestAttend || FALLBACK.contest.attended,
            topPercent: data.contestTopPercentage || FALLBACK.contest.topPercent,
            ranking: data.contestGlobalRanking || FALLBACK.contest.ranking,
            history: (data.contestParticipation || []).slice(-8),
          });
        }
      } catch {
        // fallback already set
      }
      setLoaded(true);
    };

    fetchStats();
  }, []);

  // GSAP — runs ONCE after loaded, so all DOM elements exist
  useEffect(() => {
    if (!loaded || !containerRef.current) return;

    const container = containerRef.current;
    const ctx = gsap.context(() => {
      const heading = container.querySelector('.lc-heading');
      const solvedCard = container.querySelector('.lc-solved');
      const contestCard = container.querySelector('.lc-contest');
      const chartCard = container.querySelector('.lc-chart');
      const bars = container.querySelectorAll('.difficulty-bar-fill');
      const chartBars = container.querySelectorAll('.chart-bar');
      const link = container.querySelector('.lc-link');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=450%',
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      /* Phase 1: Heading */
      if (heading) {
        tl.fromTo(heading,
          { opacity: 0, y: 30, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
          0
        );
      }

      /* Phase 2: Solved card + bars */
      if (solvedCard) {
        tl.fromTo(solvedCard,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          2
        );
      }

      bars.forEach((bar, i) => {
        tl.fromTo(bar,
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power3.out' },
          2.8 + i * 0.3
        );
      });

      /* Phase 3: Contest card */
      if (contestCard) {
        tl.fromTo(contestCard,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          4.5
        );
      }

      /* Phase 4: Chart card + bars */
      if (chartCard) {
        tl.fromTo(chartCard,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          6
        );
      }

      chartBars.forEach((bar, i) => {
        tl.fromTo(bar,
          { scaleY: 0 },
          { scaleY: 1, duration: 0.5, ease: 'back.out(1.4)' },
          6.5 + i * 0.12
        );
      });

      /* Phase 5: Link */
      if (link) {
        tl.fromTo(link,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          7.5
        );
      }
    }, container);

    // Refresh ScrollTrigger after all pinned sections recalculate
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [loaded]);

  return (
    <section
      ref={containerRef}
      className="section-full flex-col bg-[var(--color-bg)]"
      id="leetcode-stats"
    >
      <div className="w-full max-w-5xl px-6 md:px-12">

        {/* ── Heading ── */}
        <div className="lc-heading opacity-0 text-center mb-16">
          <span className="font-mono text-xs text-[var(--color-accent)] tracking-widest uppercase block mb-5">
            {'>'} cat /var/log/leetcode.log
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] mb-4">
            Problem <ScrambledText text="Solving" className="text-[var(--color-accent)]" trigger="hover" scrambleDuration={800} />
          </h2>
          <p className="text-base text-[var(--color-text-secondary)] max-w-lg mx-auto leading-relaxed">
            Not just solving — understanding patterns, time complexity, and trade-offs.
          </p>
        </div>

        {/* ── Card 1: Problems Solved ── */}
        <div className="lc-solved opacity-0 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-6 pb-5 border-b border-[var(--color-border)]">
            <span className="text-xl">📊</span>
            <span className="font-mono text-sm tracking-wider uppercase text-[var(--color-text-secondary)] font-medium">
              Problems Solved
            </span>
            <span className="ml-auto font-mono text-3xl font-bold text-[var(--color-accent)]">
              {stats.total}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Easy', count: stats.easy, total: totalProblems.easy, color: '#00b8a3' },
              { label: 'Medium', count: stats.medium, total: totalProblems.medium, color: '#ffc01e' },
              { label: 'Hard', count: stats.hard, total: totalProblems.hard, color: '#ff375f' },
            ].map((d) => (
              <div key={d.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm font-medium" style={{ color: d.color }}>{d.label}</span>
                  <span className="font-mono text-sm text-[var(--color-text-muted)]">
                    {d.count}<span className="text-xs"> / {d.total}</span>
                  </span>
                </div>
                <div className="h-3 bg-[var(--color-border)] rounded-full overflow-hidden">
                  <div
                    className="difficulty-bar-fill h-full rounded-full origin-left"
                    style={{
                      backgroundColor: d.color,
                      width: `${(d.count / d.total) * 100}%`,
                      transformOrigin: 'left',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Card 2: Contest Rating ── */}
        <div className="lc-contest opacity-0 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-6 pb-5 border-b border-[var(--color-border)]">
            <span className="text-xl">🏆</span>
            <span className="font-mono text-sm tracking-wider uppercase text-[var(--color-text-secondary)] font-medium">
              Contest Rating
            </span>
            <span className="ml-auto font-mono text-3xl font-bold text-[var(--color-accent)]">
              {contest.rating}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="text-center py-5 bg-[var(--color-bg)]/50 rounded-xl border border-[var(--color-border)]">
              <span className="font-mono text-2xl font-bold text-[var(--color-accent-blue)] block mb-1">{contest.attended}</span>
              <span className="font-mono text-xs text-[var(--color-text-muted)]">Contests</span>
            </div>
            <div className="text-center py-5 bg-[var(--color-bg)]/50 rounded-xl border border-[var(--color-border)]">
              <span className="font-mono text-2xl font-bold text-[var(--color-accent)] block mb-1">
                Top {contest.topPercent}%
              </span>
              <span className="font-mono text-xs text-[var(--color-text-muted)]">Global</span>
            </div>
            <div className="text-center py-5 bg-[var(--color-bg)]/50 rounded-xl border border-[var(--color-border)]">
              <span className="font-mono text-2xl font-bold text-[var(--color-accent-purple)] block mb-1">
                #{contest.ranking?.toLocaleString()}
              </span>
              <span className="font-mono text-xs text-[var(--color-text-muted)]">Rank</span>
            </div>
          </div>
        </div>

        {/* ── Card 3: Rating History (always rendered) ── */}
        <div className="lc-chart opacity-0 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-8 mb-10">
          <div className="flex items-center gap-4 mb-6 pb-5 border-b border-[var(--color-border)]">
            <span className="text-xl">📈</span>
            <span className="font-mono text-sm tracking-wider uppercase text-[var(--color-text-secondary)] font-medium">
              Rating History
            </span>
          </div>
          {contest.history?.length > 0 ? (
            <div className="flex items-end gap-3 h-32">
              {contest.history.map((h, i) => {
                const minR = Math.min(...contest.history.map(x => x.rating));
                const maxR = Math.max(...contest.history.map(x => x.rating));
                const range = maxR - minR || 1;
                const height = 15 + ((h.rating - minR) / range) * 85;
                const isUp = h.trendDirection === 'UP';
                return (
                  <div
                    key={i}
                    className="chart-bar flex-1 rounded-t-lg origin-bottom transition-all duration-200 group relative cursor-default"
                    style={{
                      height: `${height}%`,
                      backgroundColor: isUp ? 'var(--color-accent)' : '#ff375f',
                      opacity: 0.7,
                      transformOrigin: 'bottom',
                    }}
                    title={`${h.contest?.title}: ${Math.round(h.rating)}`}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7'; }}
                  >
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 font-mono text-xs text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {Math.round(h.rating)}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32">
              <span className="font-mono text-sm text-[var(--color-text-muted)]">Loading contest data...</span>
            </div>
          )}
        </div>

        {/* ── Link ── */}
        <div className="lc-link opacity-0 text-center">
          <a
            href={`https://leetcode.com/${LEETCODE_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-mono text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors py-3 px-6 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-accent)]/30"
          >
            <span>→</span>
            <span>leetcode.com/{LEETCODE_USERNAME}</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default LeetCodeStats;
