import os, glob, re

pages_dir = r"c:\Users\radou\Desktop\Portfolio\src\pages\dashboard"
components_dir = r"c:\Users\radou\Desktop\Portfolio\src\components\dashboard"

files = []
files.extend(glob.glob(os.path.join(pages_dir, '*.jsx')))
files.extend(glob.glob(os.path.join(components_dir, '*.jsx')))

replacements = {
    # Gradients
    "from-blue-600 to-cyan-500": "from-violet-600 to-cyan-500",
    "from-blue-500 to-cyan-500": "from-violet-500 to-cyan-500",
    "from-cyan-400 to-blue-500": "from-cyan-400 to-violet-500",
    "from-blue-500 to-cyan-400": "from-violet-500 to-cyan-400",
    
    # Text
    "text-blue-600": "text-violet-600",
    "text-blue-300": "text-violet-300",
    "text-blue-700": "text-violet-700",
    "text-blue-400": "text-violet-400",
    
    # Backgrounds & Borders
    "border-blue-500/30": "border-white/10",
    "hover:border-cyan-400/50": "hover:border-violet-500/50",
    "hover:shadow-cyan-500/10": "hover:shadow-violet-500/10",
    "bg-white border-blue-200 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/10": "bg-white/80 border-slate-200 hover:border-violet-300 hover:shadow-2xl hover:shadow-violet-500/5",
    "bg-gray-900 border-white/10": "bg-[#08080f] border-white/10",
    "bg-white border-blue-200": "bg-white border-slate-200",
    "bg-blue-600/20 hover:bg-blue-600/30": "bg-violet-600/20 hover:bg-violet-600/30",
    "border-blue-500/30": "border-white/10",
    "bg-blue-50 hover:bg-blue-100": "bg-violet-50 hover:bg-violet-100",
    "border-blue-200": "border-slate-200",
    "bg-blue-600/30 border-2 border-blue-500/50": "bg-violet-600/30 border-2 border-violet-500/50",
    "text-cyan-300": "text-violet-300",
    "rounded-2xl": "rounded-3xl",
    "rounded-lg": "rounded-xl"
}

changed_count = 0
for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    orig_content = content
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    if orig_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        changed_count += 1
        print(f'Updated {os.path.basename(filepath)}')

print(f'Total files updated: {changed_count}')
