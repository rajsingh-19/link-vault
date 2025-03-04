# Link Vault App

## Setup Instructions

### Prerequisites
  Node.js (v16+ recommended)
  npm or yarn

### Installation
    Clone the repository:
    git clone <repository-url>
    cd link-vault-app

### Install dependencies:
    npm install
    ### or
    yarn install

### Start the development server:
    npm run dev
    ### or
    yarn dev

### Open the application in your browser at http://localhost:5173/ (default Vite port).


## About
This is a Link Vault App, a Mini Link Management Platform, inspired by Linktree. Users can create a personalized link-sharing profile, customize its appearance, and track analytics for their shared links.

## Features Implemented
1. Landing Page

    A public-facing landing page that is fully responsive across all devices.

2. Signup & Login Page

    Users can sign up using an email, password, and username with basic validations such as unique email checks and password strength verification. Passwords are securely hashed using bcrypt. The login system supports authentication via JWT or session-based methods. A secure logout option ensures the user session is properly ended.

3. Dashboard

    The dashboard serves as the central hub where users can create their profile page by adding social media links (Instagram, Twitter, etc.), a profile picture, a banner image, and links to shops or products. Users can also manage their list of links by adding, editing, or deleting them while viewing a real-time preview of their public sharable link profile.

4. Appearance Customization

    Users can personalize their profile with various customization options. They can choose from pre-designed background themes, customize button shapes, colors, and designs, and select predefined layouts for displaying links, images, and icons.

5. Analytics Page

    Users can track unique views where only one view per unique IP per link is counted, preventing duplicate counts from the same user or device. Analytics include tracking the number of clicks per link, device type (mobile, desktop, tablet), geographic location (country/city), and referring sources (social media, direct, etc.). All analytics are visualized through bar charts and pie charts.

6. Settings Page
   
    Users can manage their accounts by updating their name, email, and password. They also have the option to delete their account, which removes all associated data, including their profile and links.

7. Responsive Design

    Ensures the platform works seamlessly on both desktop and mobile devices.

8. Profile Sharing Page

    user can share the profile to others
    

***************************************************************************
## Live Link : https://linkvaultapp.netlify.app/

