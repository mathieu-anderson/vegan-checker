# vegan-checker
Quickly check if an ingredient is not vegan, or *maybe* vegan. Based on [is-vegan](https://github.com/hmontazeri/is-vegan), using my forked package (for minor fixes atm) [is-not-vegan](https://www.npmjs.com/package/is-not-vegan).

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

Start dev sever on localhost:3000
```
npm start
```

# todo
- [x] Implement `is-vegan` to look up ingredients
- [ ] Fuzzy search + autocomplete on input field
- [ ] Polish UI to make it delightful
- [ ] Convert to React Native
