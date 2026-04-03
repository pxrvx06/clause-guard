ANALYZE_PROMPT = """
You are a legal assistant. Analyze the following terms and conditions document.

Return a JSON array of risky clauses. For each clause return:
- "clause": the original text (short excerpt)
- "risk_level": "High", "Medium", or "Low"
- "explanation": simple explanation in plain English (1-2 sentences)
- "rewrite": a safer version of the clause for the user

If there are no risky clauses, return an empty JSON array: []

Only return raw JSON. No markdown, no explanation outside the JSON.

Document:
{text}
"""

EMAIL_PROMPT = """
Write a polite, professional email to request changes to the following risky clauses in a contract or terms document.

Risky clauses:
{clauses}

The email should:
- Be respectful and professional
- Clearly state what needs to change and why
- End with willingness to discuss

Only return the email text, nothing else.
"""
