# components

This folder is for all components which are reusable *in context of entire project* – that is, which are used (or *may* be used) on several pages of the site.

**DO NOT** put components to this folder directly. Choose from subgroups below.

## base

Base components only describe a very basic and highly reusable things like `<Select>` or `<Lightbox>` and their styles.

They **MUST NOT** know anything about project's business-logic.

They **MUST NOT** connect to stores or dispatch actions.

## domain

Domain components are project-specific.

They **MAY** be connected to stores or execute actions.

They represent something specific for business-logic. `<Form />` and `<Table />` are base components, `<OrderForm />` and `<FriendsList />` are domain ones.

## layouts

Layouts are responsible for arranging arbitrary other components.

That is, particular layout may have no dependencies at all, but any layout can contain any other component.

Layout **MUST** render it's `children` prop.

---

Other groups may be added if necessary.

---

Except for base components, anything used only on *one particular page*, **MUST** live in folder of that page. Do not pollute this folder.

---

Please don't forget to update index files in subgroup folders, to keep imports grouping possible. Avoid creating dozens of import statements (one component per line) in your modules.

Unless you need to import specific component's types / styles / etc, use `import { Thing } from 'src/components'` instead of `import Thing from 'src/components/Thing'`
