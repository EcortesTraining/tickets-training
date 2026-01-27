# Tickets System

# 📌 Tickets System – Task List

## Task Breakdown
The following task list was used to plan and execute the development of this technical test.

## 1. Initialize Project
- [ ] Create project with React or Next.js
- [ ] Configure base folder structure
- [ ] Verify that the application runs correctly

---

## 2. Configure Redux Toolkit and RTK Query
- [ ] Configure global store
- [ ] Integrate RTK Query using `fakeBaseQuery`
- [ ] Register RTK Query reducer and middleware

---

## 3. Define Ticket Model
- [ ] Create Ticket interface/type
- [ ] Fields:
  - Subject
  - Priority
  - Detail
  - Attachment file
  - Status
  - Creation date
- [ ] Centralize the model in the tickets feature

---

## 4. Implement Storage Persistence
- [ ] Create helpers to read tickets from localStorage
- [ ] Create helpers to save tickets to localStorage
- [ ] Handle empty initial state

---

## 5. Create RTK Query Service for Tickets
- [ ] Create endpoints:
  - Get tickets
  - Create ticket
  - Delete ticket
- [ ] Simulate API using localStorage
- [ ] Configure cache invalidation

---

## 6. Create "Report Issue" View
- [ ] Create report form
- [ ] Fields:
  - Subject
  - Priority
  - Detail
  - Attach file
- [ ] Minimum validation of required fields
- [ ] Submit ticket using RTK Query

---

## 7. Create "My Reports" View
- [ ] List stored tickets
- [ ] Display columns:
  - Subject
  - Priority
  - Date
  - Status
  - Actions
- [ ] Consume data from RTK Query

---

## 8. Implement Client-Side Pagination
- [ ] Define fixed page size
- [ ] Display pagination controls
- [ ] Navigate between listing pages

---

## 9. Implement Ticket Actions
- [ ] Action to view ticket details
- [ ] Action to delete ticket
- [ ] Refresh listing after each action

---

## 10. Create Ticket Detail View
- [ ] Display complete ticket information
- [ ] Display attached file name
- [ ] Use modal or dedicated view

---

## 11. Create Layout and Navigation
- [ ] Create base application layout
- [ ] Navigation between:
  - Report issue
  - My reports
- [ ] Keep UI simple and functional

---

## 12. Handle Basic UI States
- [ ] Empty state when there are no tickets
- [ ] Loading indicator
- [ ] Disable actions during mutations

---

## 13. Document the Project
- [ ] Create README
- [ ] Include:
  - Project description
  - Technologies used
  - Installation steps
  - Technical decisions (RTK Query + storage)
  - Estimated development time

---

## 14. Final Review and Delivery
- [ ] Code cleanup
- [ ] Verify complete application flow
- [ ] Final push to GitHub repository
- [ ] Share repository link
