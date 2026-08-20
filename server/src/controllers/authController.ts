import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';
import { ENV } from '../config/env.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { UserRole, JWTPayload } from '../types/index.js';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email_or_username, password, role, school_id, class_section, grade, language_pref } = req.body;

    if (!name || !email_or_username || !password || !role) {
      res.status(400).json({ success: false, error: 'Name, username/email, password, and role are required.' });
      return;
    }

    const validRoles: UserRole[] = ['student', 'teacher', 'admin', 'department'];
    if (!validRoles.includes(role)) {
      res.status(400).json({ success: false, error: `Invalid role. Must be one of: ${validRoles.join(', ')}` });
      return;
    }

    // Validate grade if student
    if (role === 'student' && grade) {
      const parsedGrade = parseInt(grade, 10);
      if (parsedGrade < 6 || parsedGrade > 9) {
        res.status(400).json({ success: false, error: 'Grade must be between 6 and 9 for students.' });
        return;
      }
    }

    // Check if user already exists
    const existing = await query('SELECT id FROM users WHERE LOWER(email_or_username) = LOWER($1)', [email_or_username.trim()]);
    if (existing.rows.length > 0) {
      res.status(409).json({ success: false, error: 'Username or email is already registered.' });
      return;
    }

    // Hash password
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Insert user
    const insertResult = await query(
      `INSERT INTO users (
        role, name, email_or_username, password_hash, school_id, class_section, grade, language_pref
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, role, name, email_or_username, school_id, class_section, grade, language_pref, created_at`,
      [
        role,
        name.trim(),
        email_or_username.trim(),
        password_hash,
        school_id || null,
        class_section || null,
        grade ? parseInt(grade, 10) : null,
        language_pref === 'en' ? 'en' : 'or',
      ]
    );

    const newUser = insertResult.rows[0];

    // Generate JWT
    const payload: JWTPayload = {
      id: newUser.id,
      role: newUser.role,
      name: newUser.name,
      grade: newUser.grade,
    };

    const token = jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser.id,
        role: newUser.role,
        name: newUser.name,
        email_or_username: newUser.email_or_username,
        school_id: newUser.school_id,
        class_section: newUser.class_section,
        grade: newUser.grade,
        language_pref: newUser.language_pref,
        created_at: newUser.created_at,
      },
    });
  } catch (err: any) {
    console.error('[Register Error]', err);
    res.status(500).json({ success: false, error: 'Registration failed due to a server error.' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email_or_username, password } = req.body;

    if (!email_or_username || !password) {
      res.status(400).json({ success: false, error: 'Username/email and password are required.' });
      return;
    }

    const result = await query(
      `SELECT u.*, s.name as school_name 
       FROM users u 
       LEFT JOIN schools s ON u.school_id = s.id 
       WHERE LOWER(u.email_or_username) = LOWER($1)`,
      [email_or_username.trim()]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ success: false, error: 'Invalid username/email or password.' });
      return;
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      res.status(401).json({ success: false, error: 'Invalid username/email or password.' });
      return;
    }

    const payload: JWTPayload = {
      id: user.id,
      role: user.role,
      name: user.name,
      grade: user.grade,
    };

    const token = jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
        email_or_username: user.email_or_username,
        school_id: user.school_id,
        school_name: user.school_name,
        class_section: user.class_section,
        grade: user.grade,
        language_pref: user.language_pref,
        created_at: user.created_at,
      },
    });
  } catch (err: any) {
    console.error('[Login Error]', err);
    res.status(500).json({ success: false, error: 'Login failed due to a server error.' });
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Unauthorized.' });
      return;
    }

    const result = await query(
      `SELECT u.id, u.role, u.name, u.email_or_username, u.school_id, u.class_section, u.grade, u.language_pref, u.created_at, s.name as school_name, s.district 
       FROM users u 
       LEFT JOIN schools s ON u.school_id = s.id 
       WHERE u.id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ success: false, error: 'User not found.' });
      return;
    }

    res.json({
      success: true,
      user: result.rows[0],
    });
  } catch (err: any) {
    console.error('[GetMe Error]', err);
    res.status(500).json({ success: false, error: 'Failed to retrieve profile.' });
  }
};

export const getSchools = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await query('SELECT id, name, udise_code, district FROM schools ORDER BY name ASC');
    res.json({ success: true, schools: result.rows });
  } catch (err: any) {
    console.error('[GetSchools Error]', err);
    res.status(500).json({ success: false, error: 'Failed to fetch schools.' });
  }
};
