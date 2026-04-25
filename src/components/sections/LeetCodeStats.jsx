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
        // Try alfa API first
        let solvedRes = await fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`);
        let contestRes = await fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/contest`);
        
        // If rate limited, try backup API for basic stats
        if (solvedRes.status === 429) {
          const backupRes = await fetch(`https://leetcode-stats-api.herokuapp.com/${LEETCODE_USERNAME}`);
          if (backupRes.ok) {
            const backupData = await backupRes.json();
            setStats({
              total: backupData.totalSolved || FALLBACK.solved.total,
              easy: backupData.easySolved || FALLBACK.solved.easy,
              medium: backupData.mediumSolved || FALLBACK.solved.medium,
              hard: backupData.hardSolved || FALLBACK.solved.hard,
            });
          }
        } else if (solvedRes.ok) {
          const data = await solvedRes.json();
          setStats({
            total: data.solvedProblem || FALLBACK.solved.total,
            easy: data.easySolved || FALLBACK.solved.easy,
            medium: data.mediumSolved || FALLBACK.solved.medium,
            hard: data.hardSolved || FALLBACK.solved.hard,
          });
        }

        if (contestRes.ok) {
          const data = await contestRes.json();
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

  // GSAP — pinned scroll sequence
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

      let mm = gsap.matchMedia();
      
      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        let { isDesktop } = context.conditions;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: isDesktop ? 'top top' : 'top 85%',
            end: isDesktop ? '+=450%' : 'bottom 10%',
            scrub: 0.8,
            pin: isDesktop,
            anticipatePin: isDesktop ? 1 : 0,
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
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
            1.5
          );
        }

        bars.forEach((bar, i) => {
          tl.fromTo(bar,
            { scaleX: 0 },
            { scaleX: 1, duration: 1, ease: 'power3.out' },
            2 + i * 0.2
          );
        });

        /* Phase 3: Contest card */
        if (contestCard) {
          tl.fromTo(contestCard,
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
            3.5
          );
        }

        /* Phase 4: Chart card + bars */
        if (chartCard) {
          tl.fromTo(chartCard,
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' },
            5
          );
        }

        chartBars.forEach((bar, i) => {
          tl.fromTo(bar,
            { scaleY: 0 },
            { scaleY: 1, duration: 0.6, ease: 'back.out(1.4)' },
            5.5 + i * 0.1
          );
        });

        /* Phase 5: Link */
        if (link) {
          tl.fromTo(link,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6 },
            7
          );
        }
      });
    }, container);

    // FIX: Because this trigger is created asynchronously (after fetch),
    // it was created AFTER the Shutdown component's trigger. 
    // We must sort the triggers by their DOM position before refreshing
    // so that the pin-spacers are calculated top-to-bottom.
    ScrollTrigger.sort();
    
    // Give React a tick to paint any conditional DOM before recalculating
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);

    return () => {
      clearTimeout(timeout);
      ctx.revert();
    };
  }, [loaded]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full flex flex-col items-center justify-center bg-[var(--color-bg)] py-20"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* ── Card 1: Problems Solved ── */}
          <div className="lc-solved opacity-0 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6 pb-5 border-b border-[var(--color-border)]">
              <span className="text-xl">📊</span>
              <span className="font-mono text-sm tracking-wider uppercase text-[var(--color-text-secondary)] font-medium">
                Problems Solved
              </span>
              <span className="ml-auto font-mono text-3xl font-bold text-[var(--color-accent)]">
                {stats.total}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6">
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
          <div className="lc-contest opacity-0 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6 pb-5 border-b border-[var(--color-border)]">
              <span className="text-xl">🏆</span>
              <span className="font-mono text-sm tracking-wider uppercase text-[var(--color-text-secondary)] font-medium">
                Contest Rating
              </span>
              <span className="ml-auto font-mono text-3xl font-bold text-[var(--color-accent)]">
                {contest.rating}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6">
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
              <span className="font-mono text-sm text-[var(--color-text-muted)]">No recent history or rate-limited.</span>
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
