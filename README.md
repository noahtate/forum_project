# Video Store

## Usage

Install dependencies

```sh
npm install
```

Run dev server

```sh
npm run dev
```

## Assignment

### Goal

Update the video store from it's starting point to be state aware.

### Sub Goals

1. Update `App` to maintain some state for both the entire inventory (as we will be updating some of it's contents) as well some state to that captures which rental is currently selected, if any (defaults to `null`)

> It is absolutely necessary, but you might want to utlize `Context` here so all subcomponents will have access to the relevant state.

2. Update `InventoryItem` to be aware when it is clicked in order to keep track of the currently selected film

3. Update the `HomePage` to not only list the existing inventory but also to:

   - render a Button that deselects the currently selected item
   - render a `DetailsPanel` below the general inventory view to show the details of the currently selected film (if any)

4. Create a `DetailsPanel` that shows all the details of the given inventory item and includes a `Checkout` and `Return` button that modifies the `inventory` state by adding/subtracting from total available

5. Make sure the `DetailsPanel` checkout/return buttons are disabled when appropriate.

Most of the effort here will involve managing the general state of the app, which can be tricky. Good luck!

### Example Solution

A solution is provided for you in the `solution` branch, definitely use it to look at the desired goal, but otherwise only look at the code when you are stuck.

Switch the the branch with:

```sh
git checkout solution
```

> You may need to first commit any un-commited work on `main`

Just like in main, install and run dev to see the desired output:

```sh
npm install
npm run dev
```
