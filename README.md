<img src="./readme/title1.svg"/>

<br><br>

<!-- project philosophy -->
<img src="./readme/title2.svg"/>

> HOME OF PETS!  
> Paws, an ensemble of innovative platforms, revolutionizes pet care by integrating a Live Tracker device, infusing AI-driven dialogue and real-time chat, crafting machine learning searches for lost companions, nurturing pet adoption, and curating a dedicated shop for pet essentials and beyond.

### User Stories

-As a person looking to adopt a pet I want a platform where I can browse all the pets available for adoption so that I can choose my preference.  
-As a pet owner I want a platform where I can shop for my pet’s food and toys and get them delivered to me so that I can save time.  
-As a shoper I want to be able to chat with someone to help me with my inquires so that I can choose the products I need for my pet.  
-As a pet owner I want to be able to chat with someone who will be able to answer questions about my pet 24/7 so that I can keep my pet healthy and happy.  
-As a pet owner I want a tracker device to put on my dog’s collar so that I can track him on a portal if it gets lost.  
-As a pet owner who lost a pet I want a portal where I can search for my pet by uploading its image so that I can find it.
-As a person who found a lost pet I want a portal where I can report it so that It can be found

### Admin Stories

-As an admin I want to be able to manage inventory so that I can keep track of the products.  
-As an admin I want to be able to add pets and list them for adoption so that users can see them.  
-As an admin I want to approve or reject adoption requests so that I can make sure the pets are going to a safe place.  
-As an admin I want to be able to chat with the users of the website in real-time.  
<br><br>

<!-- Prototyping -->
<img src="./readme/title3.svg"/>

> The design process for Paws began with meticulous planning, utilizing Excalidraw for initial structuring of the project. This foundational step ensured a cohesive and well-organized structure. Subsequently, the project transitioned to Figma, where detailed wireframes and sophisticated mockups were meticulously crafted, laying the groundwork for a visually compelling and user-friendly design.  
> Below is a collection of some of the wireframes and mockups.

### Wireframes

> Website
> | Adopt Main Page | Adopt All Pets Page| Adopt Pet Page |
> | --------------------------------------- | ------------------------------------- | ------------------------------------- |
> | ![adopt_main_page](./readme/wireframes/Adopt-main_page.png) | ![adopt_all_pets_page](./readme/wireframes/Adopt-all_pets_page.png) | ![adopt_pet_page](./readme/wireframes/ADOPT-pet_page.png) |

> Mobile Application
> | OnBoarding Screen | Tracker Screen | Chat Screen |
> | --------------------------------------- | ------------------------------------- | ------------------------------------- |
> | ![onboarding_screen](./readme/wireframes/onboarding.png) | ![tracker_screen](./readme/wireframes/Tracker.png) | ![chat_screen](./readme/wireframes/Chat.png) |

> Desktop Application
> | Dashboard Page| Order Details Page | Add Pet Page |
> | --------------------------------------- | ------------------------------------- | ------------------------------------- |
> | ![dashboard_page](./readme/wireframes/dashboard.png) | ![order_details_page](./readme/wireframes/order-details.png) | ![add_pet_page](./readme/wireframes/add-pet.png) |

### Mockups

> Website
> | Home Page | Lost reporting Page| Shop Item Page |
> | --------------------------------------- | ------------------------------------- | ------------------------------------- |
> | ![home_page](./readme/mockups/Home.png) | ![lost_reporting_page](./readme/mockups/lost-reporting.png) | ![shop_item_page](./readme/mockups/Shop-Item.png) |

> Mobile Application
> | OnBoarding Screen | Tracker Screen | Chat Screen |
> | --------------------------------------- | ------------------------------------- | ------------------------------------- |
> | ![onboarding_screen](./readme/mockups/onboarding.png) | ![tracker_screen](./readme/mockups/Tracker.png) | ![chat_screen](./readme/mockups/Chat.png) |

> Desktop Application
> | Products Page| Adoption Requests Page | Login Page |
> | --------------------------------------- | ------------------------------------- | ------------------------------------- |
> | ![products_page](./readme/mockups/products.png) | ![adoption_requests_page](./readme/mockups/adoption-requests.png) | ![login_page](./readme/mockups/login.png) |

<br><br>

<!-- Implementation -->
<img src="./readme/title4.svg"/>

> Using the wireframes and mockups as a guide, we implemented the Coffee Express app with the following features:

### User Screens (Mobile)

| Login screen                              | Register screen                         | Landing screen                          | Loading screen                          |
| ----------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| ![Landing](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) |
| Home screen                               | Menu Screen                             | Order Screen                            | Checkout Screen                         |
| ![Landing](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) |

### Admin Screens (Web)

| Login screen                            | Register screen                       | Landing screen                        |
| --------------------------------------- | ------------------------------------- | ------------------------------------- |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |
| Home screen                             | Menu Screen                           | Order Screen                          |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

<br><br>

<!-- Tech stack -->
<img src="./readme/title5.svg"/>

### Coffee Express is built using the following technologies:

- This project uses the [Flutter app development framework](https://flutter.dev/). Flutter is a cross-platform hybrid app development platform which allows us to use a single codebase for apps on mobile, desktop, and the web.
- For persistent storage (database), the app uses the [Hive](https://hivedb.dev/) package which allows the app to create a custom storage schema and save it to a local database.
- To send local push notifications, the app uses the [flutter_local_notifications](https://pub.dev/packages/flutter_local_notifications) package which supports Android, iOS, and macOS.
  - 🚨 Currently, notifications aren't working on macOS. This is a known issue that we are working to resolve!
- The app uses the font ["Work Sans"](https://fonts.google.com/specimen/Work+Sans) as its main font, and the design of the app adheres to the material design guidelines.

<br><br>

<!-- How to run -->
<img src="./readme/title6.svg"/>

> To set up Coffee Express locally, follow these steps:

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = "ENTER YOUR API";
   ```

Now, you should be able to run Coffee Express locally and explore its features.
