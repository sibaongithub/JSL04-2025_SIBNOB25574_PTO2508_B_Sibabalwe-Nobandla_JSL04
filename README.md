# [JSL04] Submission: Dynamic Task Display & Modal View

## Project Overview
This project enhances a kanban board application by adding dynamic task rendering and interactive modal functionality. Tasks are now displayed dynamically from data and can be edited through a modal interface.

## Changes Made

### HTML (index.html)
- Added modal structure at the bottom of the body
- Changed board container from static cards to dynamic rendering with `id="boardContainer"`
- Added modal backdrop for dimming effect
- Included form elements (title input, description textarea, status select)
- Added modal styling with animations (fadeIn, slideUp, slideIn)

### JavaScript (scripts.js)
- Updated task data to match design specifications (8 tasks total)
- Added `COLUMNS` constant for column configuration
- Added `currentTask` variable to track selected task
- Created `getTasksByStatus()` function to filter tasks by status
- Created `createTaskCard()` function to build individual task cards
- Created `createColumn()` function to build complete columns
- Created `renderBoard()` function to render entire kanban board
- Created `openTaskModal()` function to display task details in modal
- Created `closeTaskModal()` function to close modal
- Created `handleTaskSubmit()` function to save task changes
- Created `init()` function to set up event listeners and initialize board
- Added event listeners for modal interactions (close button, backdrop click, Escape key)

## Features Implemented

### Dynamic Task Rendering
Tasks automatically populate from the `initialTasks` array and appear in the correct columns based on their status.

### Interactive Modal
Clicking any task card opens a modal with:
- Editable title field
- Editable description field
- Status dropdown (todo, doing, done)
- Close button (X)

### Task Status Management
Changing a task's status in the modal automatically moves it to the correct column when saved.

### Responsive Design
The board works on both desktop and mobile devices with appropriate layout adjustments.

### Animations
- Modal backdrop fades in
- Modal slides up from bottom
- Task cards slide in when rendered
- Smooth hover effects on cards

## How to Run
1. Open `index.html` in a web browser
2. Tasks will automatically load and display
3. Click any task to view and edit details
4. Change status to move tasks between columns

## Technologies Used
- HTML5
- CSS3 (Tailwind CSS)
- JavaScript (ES6+)
- Plus Jakarta Sans font

## File Structure
```
├── index.html          # Main HTML with modal structure
├── scripts.js          # JavaScript for dynamic rendering and modal
└── assets/             # Logo and icon files
```
