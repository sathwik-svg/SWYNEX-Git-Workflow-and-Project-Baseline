import { describe, it, expect } from 'vitest';
import {
  validateCommitMessage,
  validateBranchName,
  validateSemVerTag,
  CONVENTIONAL_COMMIT_TYPES,
  DEFAULT_BRANCHES,
} from '../utils/pipelineValidators';

describe('SWYNEX CI Pipeline Quality Gate Suite', () => {
  describe('Conventional Commits Validator', () => {
    it('should approve valid feature commit with scope', () => {
      const res = validateCommitMessage('feat(ci): configure github actions matrix pipeline');
      expect(res.valid).toBe(true);
    });

    it('should approve valid bugfix commit without scope', () => {
      const res = validateCommitMessage('fix: prevent duplicate runner dispatch on pull request');
      expect(res.valid).toBe(true);
    });

    it('should approve breaking change indicator (!)', () => {
      const res = validateCommitMessage('feat(auth)!: upgrade to oauth2 PKCE token flow');
      expect(res.valid).toBe(true);
    });

    it('should reject non-conventional commit messages', () => {
      const res = validateCommitMessage('fixed stuff and updated some files');
      expect(res.valid).toBe(false);
      expect(res.reason).toBeDefined();
    });

    it('should reject empty commit messages', () => {
      const res = validateCommitMessage('');
      expect(res.valid).toBe(false);
    });
  });

  describe('Git Branch Governance Gate', () => {
    it('should validate protected main branch', () => {
      const res = validateBranchName('main');
      expect(res.valid).toBe(true);
      expect(res.category).toBe('production');
    });

    it('should validate develop integration branch', () => {
      const res = validateBranchName('develop');
      expect(res.valid).toBe(true);
      expect(res.category).toBe('integration');
    });

    it('should validate ephemeral feature branch', () => {
      const res = validateBranchName('feature/ci-matrix-runner');
      expect(res.valid).toBe(true);
      expect(res.category).toBe('feature');
    });

    it('should validate hotfix branch', () => {
      const res = validateBranchName('hotfix/security-patch');
      expect(res.valid).toBe(true);
      expect(res.category).toBe('hotfix');
    });

    it('should reject unstructured branch names', () => {
      const res = validateBranchName('my-test-work-123');
      expect(res.valid).toBe(false);
    });
  });

  describe('Semantic Versioning Release Gate', () => {
    it('should approve standard v1.0.0 release tag', () => {
      expect(validateSemVerTag('v1.0.0')).toBe(true);
    });

    it('should approve pre-release tags like v2.1.0-beta.1', () => {
      expect(validateSemVerTag('v2.1.0-beta.1')).toBe(true);
    });

    it('should reject invalid tags without v prefix or non-semver notation', () => {
      expect(validateSemVerTag('release_1')).toBe(false);
      expect(validateSemVerTag('1.0')).toBe(false);
    });
  });

  describe('Baseline Architecture Invariants', () => {
    it('should verify defined branch list is non-empty', () => {
      expect(DEFAULT_BRANCHES.length).toBeGreaterThanOrEqual(4);
    });

    it('should verify conventional commit types coverage', () => {
      const types = CONVENTIONAL_COMMIT_TYPES.map((t) => t.type);
      expect(types).toContain('feat');
      expect(types).toContain('fix');
      expect(types).toContain('ci');
      expect(types).toContain('test');
    });
  });
});
