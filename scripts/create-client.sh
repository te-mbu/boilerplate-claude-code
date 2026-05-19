#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# create-client.sh — Bootstrap a new client project from the boilerplate
# =============================================================================
# Usage: ./scripts/create-client.sh "Client Name" client-slug
# Example: ./scripts/create-client.sh "Acme Corp" acme-corp
#
# What it does:
# 1. Copies the boilerplate into ~/Projects/<client-slug> (configurable)
# 2. Updates client.config.ts with provided values
# 3. Installs dependencies
# 4. Runs pnpm setup (reads client.config.ts, applies across project)
# 5. Creates a fresh git repo
# =============================================================================

PROJECTS_DIR="${PROJECTS_DIR:-$HOME/Projects}"

# --- Args ---
if [ $# -lt 2 ]; then
  echo "Usage: $0 \"Client Name\" client-slug"
  echo ""
  echo "Example: $0 \"Acme Corp\" acme-corp"
  echo ""
  echo "Options (env vars):"
  echo "  PROJECTS_DIR  Base directory for projects (default: ~/Projects)"
  echo "  SITE_URL      Production URL (default: https://client-slug.com)"
  echo "  LOCALE        Default locale: fr or en (default: fr)"
  echo "  CMS           CMS choice: sanity or static (default: static)"
  echo "  SITE_TYPE     Site type: landing, marketing, corporate, etc. (default: marketing)"
  exit 1
fi

CLIENT_NAME="$1"
CLIENT_SLUG="$2"
TARGET_DIR="$PROJECTS_DIR/$CLIENT_SLUG"
SITE_URL="${SITE_URL:-https://$CLIENT_SLUG.com}"
LOCALE="${LOCALE:-fr}"
CMS="${CMS:-static}"
SITE_TYPE="${SITE_TYPE:-marketing}"
BOILERPLATE_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo ""
echo "🏗️  Creating project for: $CLIENT_NAME"
echo "   Slug:      $CLIENT_SLUG"
echo "   Directory:  $TARGET_DIR"
echo "   URL:        $SITE_URL"
echo "   Locale:     $LOCALE"
echo "   CMS:        $CMS"
echo "   Site type:  $SITE_TYPE"
echo ""

# --- Guard ---
if [ -d "$TARGET_DIR" ]; then
  echo "❌ Directory already exists: $TARGET_DIR"
  exit 1
fi

# --- Copy boilerplate ---
echo "📁 Copying boilerplate..."
mkdir -p "$PROJECTS_DIR"
cp -R "$BOILERPLATE_DIR" "$TARGET_DIR"

# Remove boilerplate git history
rm -rf "$TARGET_DIR/.git"

# Remove create-client script from the new project (it's a boilerplate tool)
rm -f "$TARGET_DIR/scripts/create-client.sh"

cd "$TARGET_DIR"

# --- Update client.config.ts with provided values ---
echo "✏️  Updating client.config.ts..."
sed -i '' "s|\"\\[CLIENT_NAME\\]\"|\"$CLIENT_NAME\"|g" client.config.ts
sed -i '' "s|\"client-slug\"|\"$CLIENT_SLUG\"|g" client.config.ts
sed -i '' "s|\"https://example.com\"|\"$SITE_URL\"|g" client.config.ts
sed -i '' "s|locale: \"fr\"|locale: \"$LOCALE\"|g" client.config.ts
sed -i '' "s|cms: \"static\"|cms: \"$CMS\"|g" client.config.ts
sed -i '' "s|siteType: \"marketing\"|siteType: \"$SITE_TYPE\"|g" client.config.ts

# --- Install dependencies ---
echo "📦 Installing dependencies..."
pnpm install

# --- Run setup ---
echo "⚙️  Running setup..."
pnpm setup

# --- Init git ---
echo "🔧 Initializing git..."
git init
git add -A
git commit -m "Initial commit — $CLIENT_NAME project from boilerplate"

echo ""
echo "✅ Project ready at: $TARGET_DIR"
echo ""
echo "Next steps:"
echo "  cd $TARGET_DIR"
echo "  # Edit client.config.ts to customize pages, features, theme"
echo "  # Fill design-system/client-brief.md with brand context"
echo "  pnpm dev"
echo ""
if [ "$CMS" = "sanity" ]; then
  echo "  # Add Sanity credentials to client.config.ts and re-run:"
  echo "  pnpm setup"
  echo ""
fi
