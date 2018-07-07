# vegan-checker
Quickly check if an ingredient is not vegan, or *maybe* vegan. Based [my fork](https://github.com/mathieu-anderson/is-vegan) of [is-vegan](https://github.com/hmontazeri/is-vegan), available as the [is-not-vegan](https://www.npmjs.com/package/is-not-vegan) package (first time forking / publishing a project, so not sure if I'm breaching some etiquette here).

# try current state
Work in progress, but you can try it out here : http://vegan-checker.surge.sh/

# setting up
Clone repo and move to the project's directory.
```
git clone https://github.com/mathieu-anderson/vegan-checker.git
cd vegan-checker
```

Install dependencies (requires having npm installed).
```
npm install
```

Start dev server on `localhost:3000`
```
npm start
```

# todo
- [x] Implement `is-vegan` to look up ingredients
- [x] Fuzzy search + autocomplete on input field
- [x] Add link to look up problematic ingredient (only google link now, too heavy to check actual source, but would be nice if added to is-vegan package)
- [x] Fix mobile UI
- [ ] Polish UI to make it delightful / usable :
  - [ ] `About` info : what this app does
  - [ ] Expressive animations on red and orange cases
  - [ ] Support for multiline result for long ingredients
- [ ] Make production ready : about page, license, security, hosting, testing
- [ ] Convert to React Native
