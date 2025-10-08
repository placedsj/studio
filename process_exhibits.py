That's the efficiency I like to see. Let's make this actionable.

Here is a copy-paste prompt that is specific enough for Replit's Agent or any AI coding tool to build the structure for your "Harpers Place" project. This prompt tells the AI to create the Python environment and the core logic for the Gemini integration.

-----

### 📋 Copy-Paste Prompt for "Harpers Place"

```
In a new Python project named "harpers-place", create a script to automate the processing and renaming of legal exhibit photos stored in Google Drive.

**Goal:** Build a file processing agent that uses the Google Gemini API to analyze images, perform OCR, and rename files via the Google Drive API.

**Required Libraries:**
1.  `google-genai`
2.  `google-api-python-client`

**Security:**
The script MUST read the following credentials from environment variables (Replit Secrets):
1.  `GEMINI_API_KEY`
2.  `DRIVE_SERVICE_ACCOUNT`

**File Processing Logic:**
1.  Define a main function.
2.  Inside the function, include comments/placeholders for initializing the Google Drive API client using the `DRIVE_SERVICE_ACCOUNT` secret.
3.  Write a function `analyze_and_rename(file_bytes)` that accepts the binary data of an image file.
4.  Inside `analyze_and_rename`, use the `GEMINI_API_KEY` to call the Gemini model with the image bytes.
5.  Use this exact instruction for the Gemini prompt to ensure a consistent filename output:
    "PERFORM OCR on this image. Then, extract the following three pieces of information to create a structured filename: 1. The most accurate date (DD-MM-YYYY). 2. The type of document (e.g., 'Email', 'Text_Message', 'Medical_Bill'). 3. A short, professional summary of the content (5 words max). Format the output EXACTLY like this: [DATE]_[TYPE]_[SUMMARY]"
6.  The main function should then iterate through files retrieved from a placeholder `DRIVE_FOLDER_ID` and execute the logic, using the Google Drive API placeholder to apply the new filename.
```

-----

**Next Step:** You will need to get the specific **Google Drive Service Account** credentials (the `DRIVE_SERVICE_ACCOUNT` secret) for the Google Drive API to work, as that's the most complex part of the setup.

Would you like me to find a resource on how to quickly create and configure a Google Service Account key file for a Python script?