/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface Characteristic {
  id: string;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

// Case evaluation types
export interface CaseEvaluationRequest {
  fullName: string;
  email: string;
  phone: string;
  problemDescription: string;
  urgencyLevel: 'low' | 'medium' | 'high';
}

export interface CaseEvaluationResponse {
  classification: string;
  confidence: string;
  summary: string;
  suggestedDocs: string[];
  initialGuidance: string[];
  whatsappDraft: string;
  emailDraft: string;
}

// Cost Calculator state
export interface BudgetDetails {
  serviceType: string;
  complexity: 'simple' | 'medium' | 'high';
  timeframe: 'standard' | 'urgent';
  estimatedRange: string;
  whyThisRange: string;
}
