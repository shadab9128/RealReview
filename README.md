## Please give me feedback then I move to AWS
## RealReview

- This project support both LocalStorage and Supabase for databases.

## For creating Databases

### 1. Create a Supabase Project
- Go to https://app.supabase.com/ and sign in.
- Click New project.
- Fill in your project details and create the project.
### 2. Create the image_reviews Table
- In your Supabase project dashboard, go to Table Editor.
- Click New Table.
- Set the table name to image_reviews.
- Add the following columns:
Name	    Type	    Default/Extra	    Notes
id	        uuid	    gen_random_uuid()	Primary key
imageurl	text		                    URL to the uploaded image
description	text		                    Review description
location	text		                    Location info
review	    text		                    The review text
createdat	timestamp	now()	            Creation timestamp

- Set id as the Primary Key.
- Set createdat default value to now().

- Example
```sh
create table public.image_reviews (
  id uuid primary key default gen_random_uuid(),
  imageurl text,
  description text,
  location text,
  review text,
  createdat timestamp with time zone default now()
);
```
### 3. Enable Storage for Images
If you want to store images:

- Go to Storage in Supabase dashboard.
- Create a new Bucket (e.g., images).
- Use Supabase Storage API to upload images and get their public URLs.

### 4. Get Your Supabase Credentials
- Go to Settings → API in your Supabase project.
- Copy the Project URL and anon public key.
- Use these in your file.


The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```



