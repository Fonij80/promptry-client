# PhoneNumberInput

- Usage:

```typescript
// Single country mode (USA only)
<PhoneNumberInput
  fixedCountryCode="+1"
  value="+15551234567"
  onChange={handleChange}
  label="Phone Number"
/>

<PhoneNumberInput
  id="iran-phone"
  fixedCountryCode="+98"  // ✅ Locks to Iran (+98)
  value={phoneValue}
  onChange={setPhoneValue}
  label="شماره موبایل"
  placeholder="09xxxxxxxxx"
  required
  error={formError}
  showError={isSubmitted}
/>

// Multi-country with error control
<PhoneNumberInput
  value={phoneValue}
  onChange={setPhoneValue}
  label="شماره تماس"
  error={formError}
  showError={isSubmitted}
  required
/>
```
