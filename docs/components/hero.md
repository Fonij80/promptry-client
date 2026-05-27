## Basic Hero (Your Template Home Page)

```typescript
export const Home = () => (
  <>
    <Hero />
    {/* More sections... */}
  </>
);
```

## Full Customization

```typescript
<Hero
  title="Launch Your SaaS in Days"
  subtitle="Everything you need to build, launch, and scale your startup."
  primaryCTA={{
    children: "Get Started Free",
    href: "/signup",
  }}
  secondaryCTA={{
    children: "Watch Demo",
    href: "https://youtube.com/watch?v=demo",
  }}
  badges={["No Code", "AI Powered", "Enterprise Ready"]}
  stats={[
    { value: "100K+", label: "Active Users" },
    { value: "500M", label: "Transactions" },
  ]}
/>
```

## Video Background

```typescript
<Hero
  background={{
    src: "/hero-video.mp4",
    alt: "Hero video",
    video: true,
  }}
  primaryCTA={{ children: "Start Free Trial", href: "/signup" }}
/>
```

## Minimal Hero

```typescript
<Hero
  title="Simple & Fast"
  subtitle="Get started in 60 seconds."
  showStats={false}
  showFeatures={false}
/>
```
