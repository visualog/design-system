---
description: Bumps the package version and pushes the changes with tags. Trigger with "릴리즈 [패치/마이너]"
---

1. Check if the argument is "패치" (patch) or "마이너" (minor). If "패치", set type to `patch`. If "마이너", set type to `minor`. Default to `patch` if unclear.
2. Run `npm version <type> -m "chore: release v%s"` to update package.json and create a git tag.
3. Run `git push` to push the commit.
4. Run `git push --tags` to push the new tag.
