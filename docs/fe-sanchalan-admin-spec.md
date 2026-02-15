# Sanchalan Admin FE Specification

**Project**: `sanchalan-admin`  
**Created**: 2026-02-15  
**Status**: Draft v1

## 1. Goal
Build an internal web admin panel for the Sanchalan team to operate the platform centrally:
- onboard and configure schools
- bulk import students from Excel/CSV
- manage school subscriptions and billing lifecycle
- run support operations with full audit trail

## 2. Users and Roles (Internal)
- `PlatformOwner`: full control including lifecycle overrides
- `PlatformOps`: school onboarding, setup, import operations
- `FinanceOps`: plans, invoices, payments, subscription transitions
- `SupportOps`: account unlock, import retries, impersonation (audited)
- `ReadOnlyAuditor`: read-only reports and audit exploration

## 3. In Scope (MVP)

### 3.1 School Operations
- School list with filters: status, plan, onboarding stage
- School create wizard:
  - basic profile
  - contact/admin bootstrap
  - module enablement
  - confirmation
- School detail page:
  - profile and status timeline
  - current subscription
  - latest import jobs

### 3.2 Student Import Center
- Template download (`.xlsx`, `.csv`)
- File upload and column mapping
- Validation preview (valid/invalid/duplicate/warnings)
- Commit import as async job
- Import history with job status
- Error report download and retry flow

### 3.3 Subscription and Billing
- Plan catalog management
- Assign/change plan per school
- Invoice list/detail, payment recording
- Grace period and restriction state visibility
- Subscription timeline (upgrades, downgrades, credits)

### 3.4 Support Console
- Unlock account
- Trigger admin password reset
- Retry failed import/webhook
- Scoped impersonation with visible banner and stop control

### 3.5 Audit and Reporting
- Audit explorer with filters (actor/action/school/date)
- Export CSV report
- Operations dashboard KPIs:
  - onboarding conversion
  - import success ratio
  - active schools by plan
  - overdue schools and risk list

## 4. Out of Scope (MVP)
- Sales CRM and lead funnel
- Public self-signup for schools
- Advanced accounting integration
- Multi-currency and multi-tax-region support

## 5. Functional Requirements
- FE-001: All screens must be permission-aware at route and action level.
- FE-002: High-impact actions must require reason input (and optional step-up auth response from backend).
- FE-003: Import flows must support resumable UX (job polling, recover after refresh).
- FE-004: Billing actions must use server-confirmed responses (no optimistic state for payment-critical actions).
- FE-005: Every list screen must support pagination, search, and status filters.
- FE-006: Error handling must show user-safe messages and include trace/request ID when available.

## 6. UX and IA

### 6.1 Primary Navigation
- `Dashboard`
- `Schools`
- `Imports`
- `Subscriptions`
- `Billing`
- `Support`
- `Audit`

### 6.2 Critical User Flows
1. Create school -> bootstrap admin -> assign plan -> start import.
2. Upload file -> map columns -> preview -> commit -> monitor -> download errors.
3. Invoice overdue -> apply grace -> transition to restricted -> restore on payment.
4. Support incident -> impersonate -> fix issue -> stop session -> verify audit log.

### 6.3 UX Guardrails
- Destructive or restrictive actions require confirmation modal.
- Impersonation state must be always visible (top banner).
- Long-running operations must show asynchronous status, retry, and last update time.

## 7. Frontend Technical Architecture
- Stack: React + TypeScript + React Router + TanStack Query.
- State split:
  - server state via query cache
  - local state for forms/wizards/modals
- API layer:
  - dedicated `platformApiClient`
  - global interceptors for auth, request ID, error normalization
- Module structure:
  - `src/features/schools/*`
  - `src/features/imports/*`
  - `src/features/subscriptions/*`
  - `src/features/billing/*`
  - `src/features/support/*`
  - `src/features/audit/*`

## 8. Backend Contracts Needed by FE
- `POST /api/platform/v1/schools`
- `GET /api/platform/v1/schools`
- `POST /api/platform/v1/schools/{schoolId}/status-transition`
- `POST /api/platform/v1/schools/{schoolId}/imports/students/upload`
- `POST /api/platform/v1/schools/{schoolId}/imports/students/preview`
- `POST /api/platform/v1/schools/{schoolId}/imports/students/commit`
- `GET /api/platform/v1/import-jobs/{jobId}`
- `GET /api/platform/v1/import-jobs/{jobId}/errors/export`
- `POST /api/platform/v1/subscription-plans`
- `POST /api/platform/v1/schools/{schoolId}/subscriptions/assign`
- `POST /api/platform/v1/invoices/{invoiceId}/payments`
- `POST /api/platform/v1/support/impersonation/start`
- `POST /api/platform/v1/support/impersonation/end`
- `GET /api/platform/v1/audit-events`

## 9. Delivery Plan

### Phase A (Foundation)
- Auth shell, RBAC route guard, base layout, school list and create flow

### Phase B (Imports)
- Import center end-to-end including preview, commit, polling, reports

### Phase C (Subscriptions and Billing)
- Plan catalog, school subscription flows, invoice/payment screens

### Phase D (Support and Audit)
- Support console, impersonation UX, audit explorer and export

### Phase E (Hardening)
- Accessibility checks, performance polish, role-permission UAT, incident runbook

## 10. Acceptance Criteria
- Internal team can onboard a new school without DB intervention.
- Team can import 5,000+ student records with row-level error handling.
- Team can manage full subscription lifecycle and overdue transitions.
- All privileged actions are traceable from FE (request ID + audit reference).

## 11. Open Decisions
- Final FE design system choice (reuse from `sanchalan` vs new)
- Real-time updates approach (polling only vs websocket for job status)
- Exact role-permission matrix for first production release
