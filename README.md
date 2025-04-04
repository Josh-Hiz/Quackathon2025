# Quackathon 2025 Main Project

## Team Info

Team Name: Hackademics

### Team Members

- Joshua Hizgiaev
- Dan Liu
- Amartya Kalra
- Matthew Soltys

## Project Info

### Prompt Chosen

**Best Overall**: This award recognizes the project that excels across all categories—innovation, design, impact, and execution. Your challenge with this prompt is to create a well-rounded, high-quality solution that not only addresses a real-world problem effectively but also demonstrates technical excellence, user-focused design, and creativity. The winning team will have built a project that stands out as the strongest contender across the board, showcasing ingenuity, thoughtful implementation, and meaningful impact.

### Project Description

Our project is **EMSnap**, an app designed to faster EMS response times by allowing users to take pictures of the situation, then our app using deep learning models will generate a prompt to send to EMS and location data for instant EMS requests.

### Tech Stack

- **React-Native**: Open source UI software framework developed by Meta. It is commonly used to develop apps for Android, IOS, macOS, and Windows.
- **Expo**: Expo/EAS is an open-source framework built on top of React Native that simplifies and streamlines the development of cross-platform mobile applications using JavaScript/TypeScript.
- **TensorFlow/Keras**: Tensorflow Keras is the high-level API for building and training deep neural networks for TensorFlow efficently and seemlessly.
- **NodeJS/TypeScript**: TypeScript is a superset of Javascript that introduces static typing and is the main programming language of this project. Using Node.js as a runtime environment and node package manager for managing third-party dependencies.
- **DeepSeek**: We utilized Deepseek's extremely fast and efficient LLM's to generate EMS messages on the fly.
- **Python**: Main programming language used to develop our own deep learning model in the Jupyter environment. (Code for this model is also provided in the folder ``dl_model`` for you to view!)

**Note:** Please see the ``dl_model/`` to view the code we created to train our own deep learning model.

## Basic Usage

Open the app, take a photo of a serious incident, press send to send the photo for deep learning processing and identification. After a couple of seconds our DeepSeek agent will generate an EMS prompt for you to view and allow you to regenerate the prompt if you want, if not, press the send to EMS button on the bottom right to perform a text-to-911 call. After doing so the 911 operators will be contacted successfully, and nothing else is needed on your end!

## Key Features

1. CNN + LSTM Deep Classification Model, using the output of both models to determine the final output. Made in Tensorflow with Python.

    Our Deep Learning Architecture:

    ![alt text](./assets/arch.jpg "Architecture")

2. React Native Mobile App. This app uses a state transition system to keep track of the app's global states. In addition, we utilize Expo and React components to style our app and have a responsive light and dark mode styling. Finally, we keep track of app global context using app-context features, allowing seemless development.

## Future TODO's if we were to continue

1. Rate limit SMS's (shouldn't be allowed to spam EMS)
2. Send SMS messages instantly, instead of opening iMessage and then sending.
3. Implement greater error checking (not allowing users to press buttons while prompt generation or sending messages is currently happening).
