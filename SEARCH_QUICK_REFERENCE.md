# Search Feature - Quick Reference

## Key Features at a Glance

✅ **Real-Time Suggestions**
- Types trigger instant product matching
- Shows up to 5 suggestions
- Product images, names, descriptions, prices

✅ **Debounced Search** (300ms)
- Optimized performance
- Smooth user experience
- Prevents excessive calculations

✅ **Keyboard Navigation**
- ↑↓ Arrow keys to navigate
- Enter to select/search
- Escape to close

✅ **Dropdown with Images**
- 50×50px product images
- Beautiful styled cards
- Hover/selected states

✅ **Search Results Page**
- `/search?q=query-term` URL
- Sortable by Relevance, Price, Name
- Grid layout with all matches

✅ **Smooth UX**
- Animations and transitions
- Loading states
- No results messaging
- Click-outside detection

---

## File Locations

| File | Purpose |
|------|---------|
| `src/components/SearchBar.jsx` | Main search component with dropdown |
| `src/components/SearchBar.css` | Search bar styling & dropdown UI |
| `src/pages/Search.jsx` | Search results page component |
| `src/pages/Search.css` | Results page styling |
| `src/components/Navbar.jsx` | Updated to use SearchBar |
| `src/App.jsx` | Added /search route |

---

## Component Props & State

### SearchBar.jsx
**No Props Required** - Uses React Router for navigation

**State:**
```javascript
- query: string (search input)
- suggestions: array (matched products)
- showSuggestions: boolean (dropdown visible)
- selectedIndex: number (keyboard selection)
```

### Search.jsx
**URL Query Parameter:** `?q=<search-term>`

**State:**
```javascript
- filteredProducts: array (search results)
- sortBy: string (sort option)
```

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| ↓ | Select next suggestion |
| ↑ | Select previous suggestion |
| Enter | Open product / Search all |
| Escape | Close dropdown |

---

## Customization Quick Tips

### Change Debounce Timing
Edit line in `SearchBar.jsx`:
```javascript
// 300ms debounce (line ~60)
}, 300);
```

### Limit Max Suggestions
Edit line in `SearchBar.jsx`:
```javascript
const MAX_SUGGESTIONS = 5; // Change this number
```

### Update Product Data
Modify `ALL_PRODUCTS` array in:
- `SearchBar.jsx` (line ~9)
- `Search.jsx` (line ~8)

### Change Dropdown Colors
Edit in `SearchBar.css`:
- `.suggestion-item.selected` - Selection color
- `.search-all` - Search all button color
- `.suggestion-price` - Price text color

---

## Testing Checklist

- [ ] Type in search bar and see suggestions
- [ ] Arrow keys navigate suggestions
- [ ] Enter key selects suggestion or searches
- [ ] Escape closes dropdown
- [ ] Click outside closes dropdown
- [ ] Product images load correctly
- [ ] Search results page shows all matches
- [ ] Sort options work correctly
- [ ] URL query parameter updates correctly
- [ ] Mobile responsive (test on 480px, 768px, 1200px)

---

## Responsive Grid Sizes

| Breakpoint | Columns |
|-----------|---------|
| < 480px | 1 column |
| 480px - 767px | 2 columns |
| 768px - 1199px | 2-4 columns |
| 1200px+ | 6 columns |

---

## Performance Metrics

- **Debounce Delay**: 300ms
- **Max Suggestions**: 5 items
- **Dropdown Max Height**: 450px (scrollable)
- **Load Time**: Instant (local data)

---

## Accessibility

- ♿ Keyboard navigable (arrow keys, Enter, Escape)
- 🔍 Search input has proper focus states
- 📱 Touch-friendly on mobile
- 🎨 High contrast colors (orange #ff8f38 on white)
- 🔤 Clear labels and messages

---

## Integration Examples

### With Backend API
Replace `ALL_PRODUCTS` in SearchBar.jsx:
```javascript
const [suggestions, setSuggestions] = useState([]);

useEffect(() => {
  fetch(`/api/search?q=${query}`)
    .then(res => res.json())
    .then(data => setSuggestions(data));
}, [query]);
```

### With Redux/Context
Instead of local state, fetch from global context:
```javascript
const { products } = useContext(ProductContext);
const filtered = products.filter(p => 
  p.name.includes(query)
);
```

---

## Browser DevTools Tips

### Debug Dropdown Issues
```javascript
// Check if suggestions are being generated
console.log(suggestions);

// Check selected index
console.log(selectedIndex);

// Check query value
console.log(query);
```

### Mobile Testing
Use Chrome DevTools:
1. Ctrl+Shift+I (or Cmd+Opt+I on Mac)
2. Click device toggle (Ctrl+Shift+M)
3. Test at 375px (iPhone) and 768px (iPad)

---

## Common Issues & Solutions

**Issue: Dropdown not appearing**
- Check if query is not empty
- Verify suggestions array has items
- Check showSuggestions state

**Issue: Search not navigating**
- Verify React Router is set up
- Check /search route exists in App.jsx
- Inspect URL query parameter

**Issue: Images not loading**
- Verify image paths are correct
- Check /public/Products/ folder
- Use browser console to see 404 errors

**Issue: Debounce not working**
- Ensure useEffect cleanup is present
- Check debounceTimerRef is being used
- Look for multiple timer instances

---

## CSS Classes Reference

### SearchBar.jsx Classes
```css
.search-bar-container
.search-bar
.search-input
.search-button
.search-icon
.suggestions-dropdown
.suggestion-item
.suggestion-image-wrapper
.suggestion-image
.suggestion-info
.suggestion-name
.suggestion-description
.suggestion-price
.search-all
.no-results
```

### Search.jsx Classes
```css
.search-results-page
.search-header
.search-query
.sort-container
.sort-select
.results-grid
.no-results-message
```

---

Generated: December 19, 2025
GUSTO E-Commerce Platform
