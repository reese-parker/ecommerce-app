# E-commerce Store

[Use the app here](https://reese-parker.github.io/ecommerce-app/)


## Description

This project is an e-commerce store where users can purchase hockey jerseys using secure card payments.

## Design

* The app uses commerce.js for store management, allowing the store owner to easily manage products and sales.
* The store is integrated with Stripe to provide secure card payments.
* React-Router v6 provides routing between the storefront and checkout pages.
* The checkout uses React Hook Form for form validation.
* The website is styled using MUI V5 components. Additional custom styles are applied using CSS modules.
* A custom hook is used to manage the users cart, providing functions for adding and remove items for example.

## How it works

* The home page features a simple design with highlighted products and a link to the storefront. On load, it calls a function to generate a cart for the customer and retrieves the products from the store's database on commerce.js. A carousel cycles through three highlighted products in mobile view, while all three are visible in a grid in desktop view - breakpoints follow MUI's guidance with the majority of desktop features appearing at 900px width.
* The store page lets customers either search through all retrieved products or filter by team from a dropdown menu. if users attempt to add a product to their cart before selecting a size, an MUI snackbar alert provides feedback. Successfully adding a product to cart calls a function from the useManageCart hook to update the cart state held in the App component.
* The cart page shows a summary of items and the subtotal, as well as giving the option to remove items or adjust the quantity. Customers can also clear their cart, or proceed to checkout when ready.
* The checkout page features an order review and MUI stepper to cycle through Address Form and Payment Form components, the former using React Hook Form to manage and validate form inputs. On load, the app pulls shipping information such as shipping countries and their cost from commerce.js; store owners can control these options from the commerce.js dashboard.
* The payment form features a card payment component from Stripe to collect card information, which then validates and integrates with commerce.js to collect payment and send order fulfillment details to the owner. Customers are navigated to a payment successful page with their order number, and receive an email confirmation for their purchase. If payment is unsuccessful, the customer is sent to a page that provides a brief explanation of the error (insufficient funds, for example) - the error is provided directly from Stripe.

## Future features

* Integrate the app with a state management solution.



## Installation

* To run the app locally you will need to setup a commerce.js account and store.. Check the [commerce.js documentation](https://commercejs.com/docs/) for detailed steps and instructions.

* Clone the repo by opening terminal and typing

```bash
$ git clone https://github.com/reese-parker/ecommerce-app.git
```

* Navigate to the new folder by typing into terminal:
```bash
$ cd ecommerce-app
```

* Install the required dependencies by typing into terminal:
```bash
$ npm install
```

* Create a local env file by typing into terminal:
```bash
$ touch .env.local
```

* Setup a commerce.js store and save the config values in the local env file.


* Run the project by typing into terminal:
```bash
$ npm start
```

## Image sources

* Product images are sourced from adidas.com, all other images are from unsplash.com.