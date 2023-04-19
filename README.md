# Sprout

## About

**Sprout** app helps you keep track of your habits 💪 I took inspiration of [this](https://www.behance.net/gallery/107179009/Habit-Sleep-Tracker-UIUX-Design) beautiful UI design by Anastasia Shorohova.

### Links

[Live Site URL](https://habit-tracker-tawny.vercel.app)

## My process

### Features

- create an account with email and password
- Facebook, GitHub, Google authentication
- guest account prefilled with data to play around with application features
- add, delete, update habits
- mark habits as completed
- week and month progress visualized in calendar
- week overview pie charts in carousel
- brief statistics section with current goals, how many habits achieved today and best streak
- upload custom avatar image

### Built with

- [React](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/docs/handbook/react.html)
- [Next.js](https://nextjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [Material UI](https://mui.com/)
- [Firebase - authorization](https://firebase.google.com/)
- [Firestore](https://firebase.google.com/docs/firestore)
- Cloud Firestore
- Context Api
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Screenshots

- Landing Page

![Landing Page](public/screenshots/start.png)

- Sign in using **Facebook**, **GitHub**, **Google** or as **Guest**

<img src='public/screenshots/sign-in.png' width='400px' alt="sign-in page">

- No Habits Page

<img src='public/screenshots/no-habits.png' width='400px' alt="no-habits page">

- Add Habit

<img src='public/screenshots/add-habit.png' width='400px' alt="add-habit page">

- Manage your habits - edit, delete

<img src='public/screenshots/manage-habits.png' width='450px' alt="manage habits page">

- Habit Dashboard

![Habit Dashboard](public/screenshots/dashboard.png)

- Settings

<img src='public/screenshots/settings.png' width='500px' alt="settings page">


## What I have learned

I have learned a lot of new things while building this application. It was my first bigger application, so a lot of problems occurred. I have learned Authentication with Firebase, signing up/signing in process. Also realtime Firestore DB was a bit of a challenge to set up and structure data in logical documents/collections shallow object. I've also used Firestore Cloud to upload images.

A big challenge was to control the asynchronism of function execution and maintaining the current state of variables available for the whole application.

I also learned more about git, branching, merging and maintaining codebase. 

It was my first time using Material-UI. Now I think pure tailwind components or Flowbite library would have been a better choice, because it was a lot overriding styles with such a custom design. I've also gained confidence in building more sophisticated and complicated UI components and Responsive Layouts.

### Database structure

### Database and data structure

```json
{
    "users": {
        "user-id": {
            "habits": {
                "habit-one":{
                    "name": "Wake up at 6am",
                    "description": "Wake up 1 hour before normal wake up time for mindful activities",
                    "frequency": [0,1,2,3,4]
                }
            },
            "checkmarks": {
                "checkmark-id": {
                    "completed": false,
                    "date": "19-04-2023",
                    "habitId": "habit-one"
                }
            },
            "settings":{
                "settings-id":{
                    "email": "abc@gmail.com",
                    "firstName": "John",
                    "lastName": "Doe",
                    "password": "sdfsgagrmj1!",
                    "image": "https://firebasestorage.googleapis.com/v0/b/habit-tracker-app-pf.appspot.com/o/image%2Fimages.jfif?alt=media&token=6a109c8c-f176-40ee-97b2-328e75440d03"
                }
            }

        }
    },
}
```

<hr>
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).



