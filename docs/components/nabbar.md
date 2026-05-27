## Remove language switcher

```typescript
<Navbar
links={links}
showLanguageSwitcher={false}
modeToggle={<ThemeToggle />}
/>
```

## Custom brand

```typescript
<Navbar
brand={

<Link to="/" className="flex items-center gap-2">
<img src="/logo.svg" className="h-6 w-6" alt="Logo" />
<span className="font-bold">My App</span>
</Link>
}
links={links}
languageSwitcher={<LanguageSwitcher />}
modeToggle={<ThemeToggle />}
/>
```

## Use as minimal navbar (only logo + theme)

```typescript
<Navbar
links={[]}
languageSwitcher={null}
showLanguageSwitcher={false}
modeToggle={<ThemeToggle />}
/>
```
