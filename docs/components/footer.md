## Basic Usage (Your Template)

```typescript
export const RootLayout = () => {
return (
<div className="min-h-screen bg-background flex flex-col">
<Layout />
<Footer />
</div>
);
};
```

## Full Customization

```typescript
<Footer
brand={
<div className="flex items-center gap-2">
<img src="/logo.svg" alt="Logo" className="h-6 w-6" />
<span className="font-bold">My SaaS</span>
</div>
}
sections={[
{
title: "Product",
links: [{ label: "Dashboard", href: "/dashboard" }],
},
]}
socialLinks={[
{
label: "GitHub",
href: "https://github.com/mycompany",
icon: <GithubIcon className="h-4 w-4" />,
},
]}
contact={{
    email: "support@mycompany.com",
  }}
/>
```

## Minimal Footer (Just Copyright)

```typescript
<Footer
  showSections={false}
  showSocial={false}
  showContact={false}
  showNewsletter={false}
/>
```

## Newsletter Integration

```typescript
const NewsletterForm = () => (

  <div className="space-y-2">
    <input
      placeholder="Enter your email"
      className="w-full rounded-md border px-3 py-2"
    />
    <Button className="w-full">Subscribe</Button>
  </div>
);

<Footer newsletter={<NewsletterForm />} />
```
