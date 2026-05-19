import { useState } from 'react';
import type { Agent } from '../types';
import {
  buildTacticalGuidePayload,
  formatStatusLabel,
  getStatusBadgeVariant,
  getRoleBadgeClass,
  getPatchBaseline,
  getLastVerified,
  isFullComposition,
} from '../lib/tacticalGuideUtils';
import type { TacticStatus, PhasePlan, UtilityStep, SiteTactic } from '../data/tactical-guides';
import { getDatasetWarning } from '../lib/tacticalGuideUtils';
import './TacticalGuide.css';

type TacticalGuideProps = {
  selectedMap: number | null;
  selectedAgents: Agent[];
};

type TabKey = 'overview' | 'attack' | 'defense' | 'agents' | 'sources';

type GuidePayload = NonNullable<ReturnType<typeof buildTacticalGuidePayload>>;

export const TacticalGuide = ({ selectedMap, selectedAgents }: TacticalGuideProps) => {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  const guide = buildTacticalGuidePayload(selectedMap, selectedAgents);

  if (!guide) return null;

  const fullComp = isFullComposition(selectedAgents);
  const tabs: { key: TabKey; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'attack', label: 'Attack' },
    { key: 'defense', label: 'Defense' },
    { key: 'agents', label: 'Agents' },
    { key: 'sources', label: 'Sources' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab guide={guide} fullComp={fullComp} />;
      case 'attack':
        return <AttackTab guide={guide} />;
      case 'defense':
        return <DefenseTab guide={guide} />;
      case 'agents':
        return <AgentsTab guide={guide} selectedAgents={selectedAgents} />;
      case 'sources':
        return <SourcesTab guide={guide} />;
      default:
        return null;
    }
  };

  return (
    <div className="tactical-guide">
      <div className="tactical-guide__header">
        <h2 className="tactical-guide__title">
          <span className="tactical-guide__title-icon">📋</span>
          Tactical Guide
        </h2>
        <p className="tactical-guide__subtitle">
          {guide.map} &middot; {selectedAgents.length} agent{selectedAgents.length !== 1 ? 's' : ''} selected
          {fullComp && ' \u00B7 Full composition'}
          {!guide.hasSpecificComposition && selectedAgents.length > 0 && (
            <span className="tactical-guide__fallback-label"> \u00B7 Using role-based fallback</span>
          )}
        </p>
      </div>

      <div className="tactical-guide__tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tactical-guide__tab ${activeTab === tab.key ? 'tactical-guide__tab--active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tactical-guide__content">
        {renderTabContent()}
      </div>
    </div>
  );
};

const OverviewTab = ({ guide, fullComp }: { guide: GuidePayload; fullComp: boolean }) => {
  if (!guide) return null;

  const comp = guide.compositionGuide;

  return (
    <div className="tactical-tab">
      {comp ? (
        <>
          <SectionCard title="Composition" status={comp.status}>
            <h3 className="tactical-card__heading">{comp.title}</h3>
            <p className="tactical-card__text">{comp.style}</p>
          </SectionCard>

          <SectionCard title="Attack Gameplan" status={comp.status}>
            <BulletList items={comp.attackIdentity} />
          </SectionCard>

          <SectionCard title="Defense Gameplan" status={comp.status}>
            <BulletList items={comp.defenseIdentity} />
          </SectionCard>

          <SectionCard title="Agent Jobs" status={comp.status}>
            {Object.entries(comp.agentJobs).map(([agent, jobs]) => (
              <div key={agent} className="tactical-agent-job">
                <span className="tactical-agent-job__name">{agent}</span>
                <ul className="tactical-agent-job__list">
                  {jobs.map((job, i) => <li key={i}>{job}</li>)}
                </ul>
              </div>
            ))}
          </SectionCard>

          <div className="tactical-grid tactical-grid--2col">
            <SectionCard title="Strong Sites" status={comp.status}>
              <BulletList items={comp.strongSites} />
            </SectionCard>
            <SectionCard title="Weak Points" status={comp.status}>
              <BulletList items={comp.weakPoints} />
            </SectionCard>
          </div>

          <SectionCard title="When to Pick" status={comp.status}>
            <BulletList items={comp.whenToPick} />
          </SectionCard>
        </>
      ) : fullComp ? (
        <>
          <InfoBanner variant="fallback">
            No specific composition guide found for this exact 5-agent setup on {guide.map}.
            Showing role-based fallback advice below.
          </InfoBanner>
          <RoleFallbackOverview guide={guide} />
        </>
      ) : (
        <>
          <InfoBanner variant="info">
            Select 5 agents for a full composition tactical guide.
            Showing partial advice based on selected agents and {guide.map} tactics.
          </InfoBanner>
          <MapTacticsSummary tactics={guide.mapTactics} />
          {guide.agentGuides.length > 0 && (
            <SectionCard title="Selected Agents" status={guide.status}>
              {guide.agentGuides.map((ag) => (
                <div key={ag.agent} className="tactical-mini-agent">
                  <span className="tactical-mini-agent__name">{ag.agent}</span>
                  <StatusBadge status={ag.status} />
                  <span className={`tactical-badge ${getRoleBadgeClass(ag.role)}`}>{ag.role}</span>
                </div>
              ))}
            </SectionCard>
          )}
        </>
      )}
    </div>
  );
};

const RoleFallbackOverview = ({ guide }: { guide: GuidePayload }) => {
  const roleMap = new Map<string, GuidePayload['agentGuides'][number]>();
  for (const ag of guide.agentGuides) {
    if (!roleMap.has(ag.role)) {
      roleMap.set(ag.role, ag);
    }
  }

  return (
    <>
      <MapTacticsSummary tactics={guide.mapTactics} />
      {guide.roleGuides.map((rg) => {
        const agentForRole = guide.agentGuides.find((ag) => ag.role === rg.role);
        return (
          <SectionCard key={rg.role} title={`${rg.role} — ${rg.tacticalRole}`} status={rg.status}>
            <div className="tactical-role-fallback">
              <div className="tactical-role-fallback__section">
                <h4>Attack</h4>
                <BulletList items={rg.attackDefaults} />
              </div>
              <div className="tactical-role-fallback__section">
                <h4>Defense</h4>
                <BulletList items={rg.defenseDefaults} />
              </div>
              <div className="tactical-role-fallback__section">
                <h4>Retake</h4>
                <BulletList items={rg.retakeRules} />
              </div>
              <div className="tactical-role-fallback__section">
                <h4>Post-Plant</h4>
                <BulletList items={rg.postPlantRules} />
              </div>
            </div>
            {agentForRole && (
              <div className="tactical-role-fallback__overview">
                <strong>{agentForRole.agent}:</strong> {agentForRole.overview}
              </div>
            )}
          </SectionCard>
        );
      })}
    </>
  );
};

const AttackTab = ({ guide }: { guide: GuidePayload }) => {

  const attackTactics = guide.mapTactics.filter((t) => t.side === 'attack');

  if (attackTactics.length === 0) {
    return (
      <div className="tactical-tab">
        <InfoBanner variant="empty">
          No specific attack tactics documented for {guide.map} yet.
        </InfoBanner>
      </div>
    );
  }

  return (
    <div className="tactical-tab">
      {guide.compositionGuide && (
        <SectionCard title="Composition Attack Identity" status={guide.compositionGuide.status}>
          <BulletList items={guide.compositionGuide.attackIdentity} />
          {Object.entries(guide.compositionGuide.agentJobs).map(([agent, jobs]) => (
            <div key={agent} className="tactical-agent-job">
              <span className="tactical-agent-job__name">{agent}</span>
              <ul className="tactical-agent-job__list">
                {jobs.map((job, i) => <li key={i}>{job}</li>)}
              </ul>
            </div>
          ))}
        </SectionCard>
      )}

      {attackTactics.map((tactic) => (
        <SiteTacticCard key={`${tactic.site}-${tactic.side}`} tactic={tactic} side="attack" />
      ))}

      {guide.agentGuides.map((ag) => {
        const attackPlans = ag.sites.flatMap((s) => s.attackPlan);
        if (attackPlans.length === 0) return null;
        return (
          <SectionCard key={ag.agent} title={`${ag.agent} — Attack`} status={ag.status}>
            <BulletList items={attackPlans} />
            {ag.sites.length > 0 && ag.sites[0].combos.length > 0 && (
              <div className="tactical-combos">
                <h4>Combos</h4>
                <BulletList items={ag.sites[0].combos} />
              </div>
            )}
          </SectionCard>
        );
      })}
    </div>
  );
};

const DefenseTab = ({ guide }: { guide: GuidePayload }) => {

  const defenseTactics = guide.mapTactics.filter((t) => t.side === 'defense');

  if (defenseTactics.length === 0) {
    return (
      <div className="tactical-tab">
        <InfoBanner variant="empty">
          No specific defense tactics documented for {guide.map} yet.
        </InfoBanner>
      </div>
    );
  }

  return (
    <div className="tactical-tab">
      {guide.compositionGuide && (
        <SectionCard title="Composition Defense Identity" status={guide.compositionGuide.status}>
          <BulletList items={guide.compositionGuide.defenseIdentity} />
        </SectionCard>
      )}

      {defenseTactics.map((tactic) => (
        <SiteTacticCard key={`${tactic.site}-${tactic.side}`} tactic={tactic} side="defense" />
      ))}

      {guide.agentGuides.map((ag) => {
        const defensePlans = ag.sites.flatMap((s) => s.defensePlan);
        if (defensePlans.length === 0) return null;
        return (
          <SectionCard key={ag.agent} title={`${ag.agent} — Defense`} status={ag.status}>
            <BulletList items={defensePlans} />
          </SectionCard>
        );
      })}
    </div>
  );
};

const AgentsTab = ({ guide }: { guide: GuidePayload; selectedAgents: Agent[] }) => {
  if (guide.agentGuides.length === 0) return null;

  return (
    <div className="tactical-tab">
      {guide.agentGuides.map((ag) => {
        const isSpecific = ag.status !== 'no-source';
        return (
          <div key={ag.agent} className="tactical-agent-card">
            <div className="tactical-agent-card__header">
              <div className="tactical-agent-card__info">
                <span className="tactical-agent-card__name">{ag.agent}</span>
                <StatusBadge status={ag.status} />
                <span className={`tactical-badge ${getRoleBadgeClass(ag.role)}`}>{ag.role}</span>
                {!isSpecific && <span className="tactical-badge tactical-badge--fallback">Role-based fallback</span>}
              </div>
            </div>

            <div className="tactical-agent-card__body">
              <p className="tactical-agent-card__overview">{ag.overview}</p>

              {ag.bestWith.length > 0 && (
                <div className="tactical-agent-card__best">
                  <strong>Works well with:</strong> {ag.bestWith.join(', ')}
                </div>
              )}

              {ag.avoidWhen && ag.avoidWhen.length > 0 && (
                <div className="tactical-agent-card__avoid">
                  <strong>Avoid when:</strong>
                  <BulletList items={ag.avoidWhen} />
                </div>
              )}

              {ag.sites.map((site) => (
                <div key={site.site} className="tactical-agent-card__site">
                  <h4>Site {site.site}</h4>
                  <p className="tactical-agent-card__role">{site.roleInComp}</p>

                  <div className="tactical-agent-card__plans">
                    <div className="tactical-agent-card__plan">
                      <h5>Attack</h5>
                      <BulletList items={site.attackPlan} />
                    </div>
                    <div className="tactical-agent-card__plan">
                      <h5>Defense</h5>
                      <BulletList items={site.defensePlan} />
                    </div>
                  </div>

                  {site.combos.length > 0 && (
                    <div className="tactical-agent-card__combos">
                      <h5>Combos</h5>
                      <BulletList items={site.combos} />
                    </div>
                  )}

                  {site.postPlantPriorities.length > 0 && (
                    <div className="tactical-agent-card__priorities">
                      <h5>Post-Plant</h5>
                      <BulletList items={site.postPlantPriorities} />
                    </div>
                  )}

                  {site.retakePriorities.length > 0 && (
                    <div className="tactical-agent-card__priorities">
                      <h5>Retake</h5>
                      <BulletList items={site.retakePriorities} />
                    </div>
                  )}

                  {site.counters.length > 0 && (
                    <div className="tactical-agent-card__counters">
                      <h5>Countered by</h5>
                      <BulletList items={site.counters} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const SourcesTab = ({ guide }: { guide: GuidePayload }) => {

  return (
    <div className="tactical-tab">
      <SectionCard title="Dataset Info" status={guide.status}>
        <div className="tactical-sources__meta">
          <div className="tactical-sources__row">
            <span className="tactical-sources__label">Patch baseline:</span>
            <span className="tactical-sources__value">{getPatchBaseline()}</span>
          </div>
          <div className="tactical-sources__row">
            <span className="tactical-sources__label">Last verified:</span>
            <span className="tactical-sources__value">{getLastVerified()}</span>
          </div>
          <div className="tactical-sources__row">
            <span className="tactical-sources__label">Map:</span>
            <span className="tactical-sources__value">{guide.map}</span>
          </div>
          <div className="tactical-sources__row">
            <span className="tactical-sources__label">Composition guide:</span>
            <span className="tactical-sources__value">
              {guide.hasSpecificComposition ? 'Specific guide available' : 'No exact match — using fallback'}
            </span>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Data Status" status={guide.status}>
        <div className="tactical-sources__statuses">
          {guide.compositionGuide && (
            <div className="tactical-sources__item">
              <span className="tactical-sources__item-label">Composition</span>
              <StatusBadge status={guide.compositionGuide.status} />
            </div>
          )}
          {guide.agentGuides.map((ag) => (
            <div key={ag.agent} className="tactical-sources__item">
              <span className="tactical-sources__item-label">{ag.agent}</span>
              <StatusBadge status={ag.status} />
            </div>
          ))}
        </div>
      </SectionCard>

      <InfoBanner variant="warning">
        {getDatasetWarning()}
      </InfoBanner>
    </div>
  );
};

const SectionCard = ({ title, status, children }: { title: string; status?: TacticStatus; children: React.ReactNode }) => (
  <div className="tactical-card">
    <div className="tactical-card__header">
      <h3 className="tactical-card__title">{title}</h3>
      {status && <StatusBadge status={status} />}
    </div>
    <div className="tactical-card__body">
      {children}
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: TacticStatus }) => (
  <span className={`tactical-badge ${getStatusBadgeVariant(status)}`}>
    {formatStatusLabel(status)}
  </span>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="tactical-bullets">
    {items.map((item, i) => <li key={i}>{item}</li>)}
  </ul>
);

const SiteTacticCard = ({ tactic, side }: { tactic: { map: string; site: string; side: string; defaultPlan: PhasePlan; altPlans?: PhasePlan[]; patchEffects?: { patch: string; scope: string; summary: string; tacticalImpact: string; sourceRefs: string[] }[] }; side: string }) => (
  <SectionCard title={`Site ${tactic.site} — ${side}`} status={tactic.defaultPlan.status}>
    <p className="tactical-card__text"><strong>{tactic.defaultPlan.title}</strong></p>
    <p className="tactical-card__text">{tactic.defaultPlan.summary}</p>

    {tactic.defaultPlan.steps.length > 0 && (
      <div className="tactical-steps">
        <h4>Steps</h4>
        {tactic.defaultPlan.steps.map((step: UtilityStep, i: number) => (
          <div key={i} className="tactical-step">
            <span className="tactical-step__by">{step.by}</span>
            <span className="tactical-step__action">{step.action}</span>
            <span className="tactical-step__zone">{step.targetZone}</span>
            <span className="tactical-step__timing">{step.timing}</span>
            <span className="tactical-step__purpose">{step.purpose}</span>
          </div>
        ))}
      </div>
    )}

    {tactic.defaultPlan.keyPositions.length > 0 && (
      <div className="tactical-positions">
        <h4>Key Positions</h4>
        <div className="tactical-positions__list">
          {tactic.defaultPlan.keyPositions.map((pos: string, i: number) => (
            <span key={i} className="tactical-position">{pos}</span>
          ))}
        </div>
      </div>
    )}

    {tactic.defaultPlan.winConditions.length > 0 && (
      <div className="tactical-win-conditions">
        <h4>Win Conditions</h4>
        <BulletList items={tactic.defaultPlan.winConditions} />
      </div>
    )}

    {tactic.defaultPlan.failConditions.length > 0 && (
      <div className="tactical-fail-conditions">
        <h4>Fail Conditions</h4>
        <BulletList items={tactic.defaultPlan.failConditions} />
      </div>
    )}

    {tactic.defaultPlan.counters.length > 0 && (
      <div className="tactical-counters">
        <h4>Counters</h4>
        <BulletList items={tactic.defaultPlan.counters} />
      </div>
    )}

    {tactic.patchEffects && tactic.patchEffects.length > 0 && (
      <div className="tactical-patch-effects">
        <h4>Patch Effects</h4>
        {tactic.patchEffects.map((pe, i) => (
          <div key={i} className="tactical-patch-effect">
            <span className="tactical-patch-effect__patch">Patch {pe.patch}</span>
            <p>{pe.summary}</p>
            <p className="tactical-patch-effect__impact">{pe.tacticalImpact}</p>
          </div>
        ))}
      </div>
    )}
  </SectionCard>
);

const MapTacticsSummary = ({ tactics }: { tactics: SiteTactic[] }) => {
  if (!tactics || tactics.length === 0) return null;

  return (
    <SectionCard title="Map Tactics Overview" status={tactics[0]?.defaultPlan.status}>
      {tactics.map((t: SiteTactic) => (
        <div key={`${t.site}-${t.side}`} className="tactical-map-tactic">
          <span className="tactical-map-tactic__site">Site {t.site}</span>
          <span className="tactical-map-tactic__side">{t.side}</span>
          <StatusBadge status={t.defaultPlan.status} />
          <p className="tactical-map-tactic__summary">{t.defaultPlan.summary}</p>
        </div>
      ))}
    </SectionCard>
  );
};

const InfoBanner = ({ variant, children }: { variant: 'info' | 'warning' | 'fallback' | 'empty'; children: React.ReactNode }) => (
  <div className={`tactical-banner tactical-banner--${variant}`}>
    {children}
  </div>
);
