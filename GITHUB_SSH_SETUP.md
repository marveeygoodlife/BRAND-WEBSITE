# How to Connect GitHub with SSH

This guide will walk you through the process of setting up SSH authentication with GitHub, allowing you to securely connect to GitHub repositories without entering your username and password every time.

## Table of Contents
- [What is SSH?](#what-is-ssh)
- [Prerequisites](#prerequisites)
- [Step 1: Check for Existing SSH Keys](#step-1-check-for-existing-ssh-keys)
- [Step 2: Generate a New SSH Key](#step-2-generate-a-new-ssh-key)
- [Step 3: Add SSH Key to SSH Agent](#step-3-add-ssh-key-to-ssh-agent)
- [Step 4: Add SSH Key to GitHub](#step-4-add-ssh-key-to-github)
- [Step 5: Test Your SSH Connection](#step-5-test-your-ssh-connection)
- [Step 6: Switch Remote URL to SSH](#step-6-switch-remote-url-to-ssh)
- [Troubleshooting](#troubleshooting)

## What is SSH?

SSH (Secure Shell) is a cryptographic network protocol that allows you to securely connect to GitHub. Using SSH keys, you can authenticate without supplying your username and personal access token at each visit.

## Prerequisites

- Git installed on your computer
- A GitHub account
- Terminal/Command Line access

## Step 1: Check for Existing SSH Keys

Before generating a new SSH key, check if you already have existing SSH keys.

**On Linux/Mac:**
```bash
ls -al ~/.ssh
```

**On Windows (PowerShell):**
```powershell
ls -al ~/.ssh
```

Look for files named:
- `id_rsa.pub`
- `id_ecdsa.pub`
- `id_ed25519.pub`

If you see any of these files, you already have an SSH key and can skip to [Step 3](#step-3-add-ssh-key-to-ssh-agent).

## Step 2: Generate a New SSH Key

If you don't have an SSH key, generate one using the following command:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

**Note:** If your system doesn't support `ed25519`, use RSA instead:
```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

Replace `your_email@example.com` with your GitHub email address.

When prompted:
1. **Enter file location**: Press `Enter` to accept the default location (`~/.ssh/id_ed25519`)
2. **Enter passphrase**: Type a secure passphrase (optional but recommended)
3. **Re-enter passphrase**: Type the same passphrase again

Your SSH key pair will be generated:
- **Private key**: `~/.ssh/id_ed25519` (keep this secure!)
- **Public key**: `~/.ssh/id_ed25519.pub` (this is what you'll add to GitHub)

## Step 3: Add SSH Key to SSH Agent

The SSH agent manages your SSH keys and remembers your passphrase.

**On Linux/Mac:**

1. Start the SSH agent:
```bash
eval "$(ssh-agent -s)"
```

2. Add your SSH private key:
```bash
ssh-add ~/.ssh/id_ed25519
```

**On Windows:**

1. Ensure SSH agent is running:
```powershell
Get-Service -Name ssh-agent | Set-Service -StartupType Manual
Start-Service ssh-agent
```

2. Add your SSH private key:
```powershell
ssh-add ~/.ssh/id_ed25519
```

## Step 4: Add SSH Key to GitHub

Now you need to add your public SSH key to your GitHub account.

### Copy Your SSH Key

**On Linux:**
```bash
cat ~/.ssh/id_ed25519.pub
```
Then manually copy the output.

Or if you have `xclip` installed:
```bash
xclip -selection clipboard < ~/.ssh/id_ed25519.pub
```

**On Mac:**
```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

**On Windows (PowerShell):**
```powershell
Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard
```

Or manually:
```powershell
cat ~/.ssh/id_ed25519.pub
```

### Add to GitHub

1. Go to [GitHub.com](https://github.com) and sign in
2. Click your profile photo in the upper-right corner
3. Click **Settings**
4. In the left sidebar, click **SSH and GPG keys**
5. Click **New SSH key** or **Add SSH key**
6. In the "Title" field, add a descriptive label (e.g., "Personal Laptop" or "Work Computer")
7. In the "Key" field, paste your public key
8. Click **Add SSH key**
9. If prompted, confirm your GitHub password

## Step 5: Test Your SSH Connection

Verify that everything is set up correctly:

```bash
ssh -T git@github.com
```

You may see a warning like this:
```
The authenticity of host 'github.com (IP ADDRESS)' can't be established.
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.
Are you sure you want to continue connecting (yes/no)?
```

Type `yes` and press Enter.

You should see a message like:
```
Hi username! You've successfully authenticated, but GitHub does not provide shell access.
```

If you see this message, congratulations! Your SSH connection is working.

## Step 6: Switch Remote URL to SSH

If you have an existing repository using HTTPS, switch it to SSH:

1. Check your current remote URL:
```bash
git remote -v
```

2. If it shows HTTPS (starts with `https://`), change it to SSH:
```bash
git remote set-url origin git@github.com:USERNAME/REPOSITORY.git
```

Replace `USERNAME` with your GitHub username and `REPOSITORY` with your repository name.

For example, for this repository:
```bash
git remote set-url origin git@github.com:marveeygoodlife/BRAND-WEBSITE.git
```

3. Verify the change:
```bash
git remote -v
```

You should now see URLs starting with `git@github.com:`

## Troubleshooting

### Permission Denied (publickey)

If you get a "Permission denied (publickey)" error:

1. Ensure your SSH key is added to the SSH agent:
```bash
ssh-add -l
```

2. If it's not listed, add it again:
```bash
ssh-add ~/.ssh/id_ed25519
```

3. Verify your SSH key is added to GitHub (see [Step 4](#step-4-add-ssh-key-to-github))

### SSH Key Not Being Used

If Git is still asking for a password:

1. Verify you're using SSH URL (starts with `git@github.com:`)
```bash
git remote -v
```

2. If using HTTPS, switch to SSH (see [Step 6](#step-6-switch-remote-url-to-ssh))

### Could Not Open a Connection to Your Authentication Agent

If you get this error when running `ssh-add`:

```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### Multiple GitHub Accounts

If you have multiple GitHub accounts, you'll need to configure SSH to use different keys. Create a config file:

```bash
nano ~/.ssh/config
```

Add:
```
# Personal GitHub account
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519

# Work GitHub account
Host github-work
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_work
```

Then clone repositories using the appropriate host:
```bash
git clone git@github-work:company/repository.git
```

## Additional Resources

- [GitHub's Official SSH Documentation](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)
- [Git Documentation](https://git-scm.com/docs)
- [SSH Key Best Practices](https://www.ssh.com/academy/ssh/key)

## Security Tips

1. **Never share your private key** (`id_ed25519`) with anyone
2. **Use a strong passphrase** to protect your private key
3. **Use different SSH keys** for different computers/accounts
4. **Regularly review** your SSH keys in GitHub Settings
5. **Remove old SSH keys** from your GitHub account when you stop using a computer

---

**Need Help?** If you encounter issues not covered here, check the [GitHub Community Forum](https://github.community/) or [Stack Overflow](https://stackoverflow.com/questions/tagged/github+ssh).
