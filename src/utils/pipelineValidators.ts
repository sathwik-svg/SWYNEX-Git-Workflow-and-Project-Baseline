import { CONVENTIONAL_COMMIT_TYPES, DEFAULT_BRANCHES } from '../data/gitStandards';

export function validateCommitMessage(message: string): { valid: boolean; reason?: string } {
  if (!message || message.trim().length === 0) {
    return { valid: false, reason: 'Commit message cannot be empty' };
  }

  // Regex matching Conventional Commits v1.0.0: <type>(<scope>)?: <description>
  const conventionalRegex = /^(feat|fix|docs|style|refactor|perf|test|chore|ci)(\([a-z0-9-_.]+\))?!?: .+/;
  if (!conventionalRegex.test(message)) {
    return {
      valid: false,
      reason: 'Commit message does not adhere to Conventional Commits specification',
    };
  }

  return { valid: true };
}

export function validateBranchName(branch: string): { valid: boolean; category: string } {
  if (branch === 'main') return { valid: true, category: 'production' };
  if (branch === 'develop') return { valid: true, category: 'integration' };
  if (branch.startsWith('feature/')) return { valid: true, category: 'feature' };
  if (branch.startsWith('bugfix/')) return { valid: true, category: 'bugfix' };
  if (branch.startsWith('release/')) return { valid: true, category: 'release' };
  if (branch.startsWith('hotfix/')) return { valid: true, category: 'hotfix' };
  return { valid: false, category: 'unknown' };
}

export function validateSemVerTag(tag: string): boolean {
  const semVerRegex = /^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
  return semVerRegex.test(tag);
}

export { CONVENTIONAL_COMMIT_TYPES, DEFAULT_BRANCHES };
