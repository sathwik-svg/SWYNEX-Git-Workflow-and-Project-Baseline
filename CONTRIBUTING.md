# Contributing to SWYNEX Project Baseline

Thank you for contributing to the **SWYNEX Technologies** engineering ecosystem. Please adhere to these guidelines to preserve codebase hygiene.

---

## 1. Development Lifecycle

1. **Pick or File an Issue**: Ensure an issue or ticket exists before initiating work.
2. **Branch from `develop`**:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```
3. **Commit with Discipline**: Use Conventional Commits (`feat(...)`, `fix(...)`, etc.).
4. **Run Local Verifications**:
   ```bash
   npm run lint
   npm run build
   ```
5. **Push and Open PR**: Submit your Pull Request targeting `develop`.

---

## 2. Pull Request Checklist

Before submitting a PR for code review, verify:
- [ ] Code builds without errors or warnings (`npm run build`).
- [ ] TypeScript types check cleanly with no `any` leaks (`npm run lint`).
- [ ] Commit messages follow the Conventional Commits format.
- [ ] No extraneous logs, temporary debug files, or `.env` secrets are committed.
- [ ] Documentation updated in `README.md` or `BRANCHING.md` if workflows changed.

---

## 3. Code Review Process

- Every PR requires at least **1 approving review** from a SWYNEX team member.
- Address all reviewer comments respectfully and push corrective commits.
- Once approved, the branch will be squashed and merged into `develop`.
