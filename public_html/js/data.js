/**
 * Static Team Data for Frontend - Multi-language Support
 */

const commonSocials = {
    github: 'https://github.com/',
    twitter: 'https://twitter.com/',
    discord: 'https://discord.gg/dVRJwT2gWc',
    ctftime: 'https://ctftime.org/team/412747/'
};

const tournamentResults = [
    { tournament: 'WannaGame Championship 2025', rank: 38, points: 3200.0000, rating: 5.081, year: 2025 },
    { tournament: 'P3rf3ctr00t CTF 2025', rank: 116, points: 1060.0000, rating: 0.000, year: 2025 },
    { tournament: 'Metared Argentina 2025', rank: 83, points: 2300.0000, rating: 0.000, year: 2025 },
    { tournament: 'GlacierCTF 2025', rank: 136, points: 450.0000, rating: 3.411, year: 2025 },
    { tournament: 'M*CTF 2025 Quals', rank: 92, points: 201.0000, rating: 0.663, year: 2025 },
    { tournament: 'AmateursCTF 2025', rank: 491, points: 10.0000, rating: 0.135, year: 2025 }
];

// --- English Data ---
const teamData_en = {
    skills: [
        { name: 'Web Security', icon: 'fa-globe' },
        { name: 'Pwn/Binary Exploitation', icon: 'fa-bomb' },
        { name: 'Reverse Engineering', icon: 'fa-cogs' },
        { name: 'Forensics', icon: 'fa-search' },
        { name: 'Cryptography', icon: 'fa-key' },
        { name: 'Steganography', icon: 'fa-eye' },
        { name: 'Miscellaneous', icon: 'fa-puzzle-piece' }
    ],
    members: [
        {
            name: 'BaoZ',
            handle: 'BaoZ',
            role: 'Team Lead / Forensics Specialist',
            bio: 'Expert in digital forensics and incident response',
            email: 'bao25807700008@hutech.edu.vn',
            avatar: 'images/BaoZ.jpg',
            specialties: ['Forensics', 'Digital Analysis', 'Incident Response'],
            socials: { github: 'https://github.com/', twitter: 'https://twitter.com/' }
        },
        {
            name: 'ReiKage',
            handle: 'ReiKage',
            role: 'Web Security / Pwn',
            bio: 'Specialist in web vulnerabilities and binary exploitation',
            email: 'anh25807700004@hutech.edu.vn',
            avatar: 'images/reikage.jpg',
            specialties: ['Web Security', 'Binary Exploitation', 'Reverse Engineering'],
            socials: { github: 'https://github.com/', twitter: 'https://twitter.com/' }
        }
    ],
    achievements: [
        {
            title: 'Top 10 Vietnam CTF Teams',
            description: 'Ranked in top 10 CTF teams nationally on CTFtime',
            year: 2024,
            type: 'ranking'
        },
        {
            title: 'DUCTF 2024 Participation',
            description: 'Participated in Down Under CTF 2024 with strong results',
            year: 2024,
            type: 'event'
        },
        {
            title: 'Local Security Workshops',
            description: 'Organized cybersecurity workshops and training for students',
            year: 2023,
            type: 'workshop'
        },
        {
            title: 'Security Research',
            description: 'Published security research and vulnerability analysis',
            year: 2023,
            type: 'research'
        }
    ],
    writeups: [
        {
            title: 'WannaGame 2025 - Freex',
            category: 'Web3',
            author: 'ReiKage',
            date: '2025',
            description: 'Exploiting a logic error in a DeFi Exchange contract to drain funds using a fake token.',
            content: `
<h3>Introduction</h3>
<p>Hello everyone, today I'm going to share in detail how my team and I "crushed" the <strong>Freex</strong> challenge in the recent WannaGame 2025. This is a pretty interesting Smart Contract challenge about a logic error in state management. The feeling when finding this bug was truly a "Eureka!" moment.</p>

<h3>1. Analysis & Reconnaissance</h3>
<p>First, the organizers gave us the Source Code of a Smart Contract called <code>Exchange.sol</code>. The task was to drain all the funds (WannaETH/OneETH) from this exchange.</p>
<p>I started reading the code and focused on the two most important functions:</p>
<ul>
    <li><code>exchangeToken(address token, uint256 amount)</code>: This function allows swapping junk tokens for <code>WannaETH</code>.</li>
    <li><code>deposit(address token, uint256 amount)</code>: This function allows depositing tokens to provide liquidity.</li>
</ul>

<h4>The Bug</h4>
<p>When I read the <code>exchangeToken</code> function carefully, I noticed a "liability" mechanism.</p>
<ul>
    <li>If the token I provide is not in the whitelist, the exchange still lets me receive <code>WannaETH</code>, <strong>BUT</strong> it records that I "owe" the exchange that amount of tokens.</li>
</ul>
<pre><code class="language-solidity">
// The confusing code
balances[msg.sender] += amount; // Add virtual WannaETH
liabilities[msg.sender][token] += amount; // Record debt of junk token
</code></pre>
<p>Then I looked at the <code>deposit</code> function. Normally, if I deposit money, the system should check if I have any debts to deduct, right? But <strong>NO</strong>!</p>
<p>The <code>deposit</code> function simply:</p>
<ol>
    <li>Receives tokens from my wallet.</li>
    <li>Updates my token balance in the exchange.</li>
    <li><strong>It completely forgets to check or deduct that <code>liabilities</code>!</strong></li>
</ol>
<p>=> <strong>Idea:</strong> I can "borrow" money from the exchange (get WannaETH), get recorded as a debtor, and then "pay back" that token amount via <code>deposit</code>. The exchange will think I'm depositing new funds, while I still keep the <code>WannaETH</code> I borrowed. Huge profit!</p>

<h3>2. Exploitation Strategy</h3>
<p>To execute this scam, I need the following steps:</p>
<ol>
    <li><strong>Preparation:</strong> I need a "Fake Token" created by myself. Why? Because I need a large amount to swap, and I must be the owner to <code>mint</code> as much as I want.</li>
    <li><strong>Step 1 - Borrow (Create Debt):</strong>
        <ul>
            <li>Call <code>exchangeToken(FakeToken, 15 ETH)</code>.</li>
            <li>The exchange gives me 15 <code>WannaETH</code>.</li>
            <li>The exchange records: "ReiKage owes 15 FakeToken".</li>
        </ul>
    </li>
    <li><strong>Step 2 - Fake Repayment (Cover Tracks):</strong>
        <ul>
            <li>Call <code>deposit(FakeToken, 15 ETH)</code>.</li>
            <li>I transfer 15 FakeToken back to the exchange.</li>
            <li>The exchange updates: "ReiKage just deposited 15 FakeToken, his FakeToken balance is 0". (It doesn't deduct the debt from Step 1).</li>
        </ul>
    </li>
    <li><strong>Step 3 - Cash Out:</strong>
        <ul>
            <li>Now I have 15 <code>WannaETH</code> in hand (from Step 1).</li>
            <li>Call <code>claimReceivedWannaETH()</code> to swap these 15 <code>WannaETH</code> for real money (OneETH) and run away.</li>
        </ul>
    </li>
</ol>

<h3>3. Tool & Script</h3>
<p>I used Python and the <code>web3.py</code> library to write an automated script. Here are the details:</p>

<h4>Exploit Script (<code>solve.py</code>)</h4>
<pre><code class="language-python">
from web3 import Web3
import json

# ... (Setup connection) ...

# Step 1: Approve the exchange to spend my FakeToken
amount = w3.to_wei(15, 'ether')
fake_token.functions.approve(exchange_address, amount).transact({'from': account_address})

# Step 2: Call exchangeToken to get WannaETH and create debt
print(">>> Calling exchangeToken...")
exchange.functions.exchangeToken(fake_token_address, amount).transact({'from': account_address})

# Step 3: Call deposit to "return" tokens but not clear debt
print(">>> Calling deposit to trick the contract...")
exchange.functions.deposit(fake_token_address, amount).transact({'from': account_address})

# Step 4: Withdraw real money
print(">>> Cash out...")
exchange.functions.claimReceivedWannaETH().transact({'from': account_address})
</code></pre>

<p><strong>Flag:</strong> <code>W1{HEre_fOr_Y0U_the_fReEEX-CH4LI3NgE-Fl@G889c}</code></p>
            `
        },
        {
            title: 'WannaGame 2025 - WickedCraft',
            category: 'Web3',
            author: 'ReiKage',
            date: '2025',
            description: 'Reverse engineering a custom bytecode interpreter in a Solidity contract to execute arbitrary calls.',
            content: `
<h3>Introduction</h3>
<p>This is a Reverse Engineering challenge on a Smart Contract platform, which is quite "tough". Instead of finding common logic errors, we face a <strong>Custom Virtual Machine (VM)</strong> written in Solidity. Imagine someone wrote their own programming language and asked us to hack it. But "too hard, give up" is not in our team's dictionary, so let's fight!</p>

<h3>1. Analysis & Reconnaissance</h3>
<p>The challenge provides a contract named <code>Aggregator</code>. Looking at the <code>swap(bytes memory data)</code> function, I see it takes a long byte string and processes it in a <code>while</code> loop.</p>
<p>This is the sign of a bytecode interpreter. My task is to understand what each <code>action</code> (opcode) does.</p>

<h4>Bytecode Decoding (Reverse Engineering)</h4>
<p>After sitting down to read the code and debug with <code>remix</code> or <code>hardhat</code>, I mapped the important opcodes:</p>
<ul>
    <li><strong>Header (First 76 bytes):</strong> Contains configuration info like start position, output position, deadline... This is very important, one wrong byte and it reverts immediately.</li>
    <li><strong>Action 0 (CALL):</strong> This is the "final boss". It executes a low-level <code>call</code> to any address.
        <ul>
            <li>Structure: <code>[ActionID (1 byte)] ... [Target Address Offset] ...</code></li>
            <li>The danger: It <strong>does not check</strong> who the target address is. I can tell it to call anywhere!</li>
        </ul>
    </li>
    <li><strong>Action 4 (MULTICALL):</strong> Allows executing multiple commands at once.</li>
</ul>

<h3>2. Exploitation Strategy</h3>
<p>My goal is to take money from the <code>WannaCoin</code> contract. The <code>Aggregator</code> contract (this VM) has the right to control funds or is the owner of <code>WannaCoin</code>.</p>
<p>The idea is: <strong>Compose a malicious bytecode, send it to <code>Aggregator</code> to run. This code will order <code>Aggregator</code> to call the <code>transfer</code> function of <code>WannaCoin</code> to transfer all funds to my wallet.</strong></p>
<p>Specific steps:</p>
<ol>
    <li><strong>Calculate Offsets:</strong> This VM uses memory offsets a lot. I have to calculate exactly which byte the <code>WannaCoin</code> address is at in the payload, and where the <code>transfer</code> command is.</li>
    <li><strong>Build Header:</strong> Create the first 76 bytes perfectly so the VM doesn't crash (Out of Bounds).</li>
    <li><strong>Inject Action 0:</strong> Insert the CALL command.
        <ul>
            <li>Target: <code>WannaCoin</code> address.</li>
            <li>Data: <code>abi.encodeWithSignature("transfer(address,uint256)", player, balance)</code>.</li>
        </ul>
    </li>
</ol>

<h3>3. Tool & Script</h3>
<p>This part requires high precision. One wrong byte and it's gone. I used Python to manipulate bytes easily.</p>

<h4>Payload Generation Script (<code>solve_wicked.py</code>)</h4>
<pre><code class="language-python">
# ... (Setup) ...

def construct_payload(target_address, player_address):
    # Initialize empty byte array
    B = bytearray(512)
    
    # --- 1. Build Header ---
    cmd_start = 0x60 
    B[0:2] = (cmd_start - 2).to_bytes(2, 'big')
    
    # --- 2. Insert Call Data ---
    target_addr_offset = 0x100 
    target_bytes = bytes.fromhex(target_address[2:])
    B[target_addr_offset : target_addr_offset + 20] = target_bytes
    
    # --- 3. Compose Action 0 (CALL) ---
    cursor = cmd_start
    B[cursor] = 0 # Opcode 0: CALL
    B[cursor+8] = (target_addr_offset + 68).to_bytes(2, 'big')
    
    return bytes(B)

print(">>> Sending payload to swap function...")
aggregator.functions.swap(payload).transact({'from': my_address})
</code></pre>

<p><strong>Flag:</strong> <code>W1{THIS-1s_wIcKeDCraft-CHAlL3nge_fLAG5060}</code></p>
            `
        },
        {
            title: 'WannaGame 2025 - Trust',
            category: 'Web',
            author: 'ReiKage',
            date: '2025',
            description: 'Bypassing Nginx access controls using SSL Session Reuse to access an internal administrative API.',
            content: `
<h3>Introduction</h3>
<p>This challenge belongs to the Web Security category but touches quite deeply on Server configuration (Nginx) and SSL/TLS protocols. If you are only used to exploiting SQL Injection or XSS, this might be a bit strange, but once understood, it's extremely logical and practical.</p>

<h3>1. Analysis & Reconnaissance</h3>
<p>The challenge gives us 2 domains:</p>
<ul>
    <li><code>public.trustboundary.local</code>: This page allows normal access if I have a Client Certificate (mTLS).</li>
    <li><code>employee.trustboundary.local</code>: Internal page, contains the flag or important API. But accessing it results in a <code>403 Forbidden</code> error immediately, even with a valid Certificate.</li>
</ul>

<h4>Why is it blocked?</h4>
<p>I guess the Nginx configuration looks something like this:</p>
<pre><code class="language-nginx">
server {
    server_name public.trustboundary.local;
    ssl_verify_client on; # Requires cert
}

server {
    server_name employee.trustboundary.local;
    ssl_verify_client on;
    deny all; # Block all
}
</code></pre>
<p>However, there is an SSL/TLS feature called <strong>Session Resumption</strong>.</p>
<ul>
    <li>When you connect via HTTPS for the first time, the Handshake process is very expensive.</li>
    <li>To speed it up, the Server issues you a <code>Session ID</code>.</li>
    <li>Next time you connect, you just need to show that <code>Session ID</code>. The Server sees it's familiar, checks the cache, finds it valid, and <strong>skips the heavy authentication checks</strong> and lets you in.</li>
</ul>
<p>=> <strong>The Vulnerability:</strong> If Nginx configures a shared Session Cache for both server blocks (<code>public</code> and <code>employee</code>), I can get a "pass" at the <code>public</code> gate and then run to the <code>employee</code> gate and show it to get in!</p>

<h3>2. Exploitation Strategy</h3>
<p>The "backdoor" attack scenario is as follows:</p>
<ol>
    <li><strong>Step 1 - Get the Ticket:</strong> Connect to <code>public.trustboundary.local</code> properly, using the issued cert and key. After successful connection, I save the <code>SSL Session ID</code>.</li>
    <li><strong>Step 2 - Use Backdoor:</strong> Open a new connection to <code>employee.trustboundary.local</code>.
        <ul>
            <li><strong>Important:</strong> During the Handshake, I force the Client to send the <code>Session ID</code> obtained in Step 1.</li>
        </ul>
    </li>
    <li><strong>Step 3 - Bypass:</strong> Nginx sees this Session ID is valid (issued by <code>public</code>), it restores the session and <strong>skips</strong> the strict access check of <code>employee</code>. So I'm in!</li>
    <li><strong>Step 4 - RCE:</strong> After bypassing, I call the API <code>/api/plugins/upload</code> to upload a shell and get the flag.</li>
</ol>

<h3>3. Tool & Script</h3>
<p>I used Python with the standard <code>ssl</code> and <code>socket</code> libraries to deeply intervene in the handshake process.</p>

<h4>Exploit Script (<code>solve_trust.py</code>)</h4>
<pre><code class="language-python">
import ssl
import socket

# ... (Setup context) ...

print(">>> Step 1: Connect to Public to get Session ID...")
sock1 = socket.create_connection((TARGET_IP, PORT))
conn1 = context.wrap_socket(sock1, server_hostname="public.trustboundary.local")
session_ticket = conn1.session
conn1.close()

print(">>> Step 2: Reuse Session ID to access Employee...")
sock2 = socket.create_connection((TARGET_IP, PORT))

# MAGIC HAPPENS HERE: Pass session=session_ticket
conn2 = context.wrap_socket(sock2, 
                            server_hostname="employee.trustboundary.local", 
                            session=session_ticket)

print("[+] Connection to Employee successful! Sending request...")
# ... (Send HTTP Request) ...
</code></pre>

<p><strong>Flag:</strong> <code>W1{C3rt5_m34n-NOThINg_W1thOuT-Pr0p3R_uSAg3_PL5_T4k3_lt-In_mInd11}</code></p>
            `
        }
    ]
};

// --- Vietnamese Data ---
const teamData_vi = {
    skills: [
        { name: 'Bảo mật Web', icon: 'fa-globe' },
        { name: 'Khai thác lỗ hổng (Pwn)', icon: 'fa-bomb' },
        { name: 'Dịch ngược (Reverse)', icon: 'fa-cogs' },
        { name: 'Điều tra số (Forensics)', icon: 'fa-search' },
        { name: 'Mật mã học (Crypto)', icon: 'fa-key' },
        { name: 'Giấu tin (Stego)', icon: 'fa-eye' },
        { name: 'Khác (Misc)', icon: 'fa-puzzle-piece' }
    ],
    members: [
        {
            name: 'BaoZ',
            handle: 'BaoZ',
            role: 'Trưởng nhóm / Chuyên gia Forensics',
            bio: 'Chuyên gia về điều tra số và ứng cứu sự cố an ninh mạng',
            email: 'bao25807700008@hutech.edu.vn',
            avatar: 'images/BaoZ.jpg',
            specialties: ['Điều tra số', 'Phân tích dữ liệu', 'Ứng cứu sự cố'],
            socials: { github: 'https://github.com/', twitter: 'https://twitter.com/' }
        },
        {
            name: 'ReiKage',
            handle: 'ReiKage',
            role: 'Bảo mật Web / Pwn',
            bio: 'Chuyên gia về lỗ hổng web và khai thác nhị phân',
            email: 'anh25807700004@hutech.edu.vn',
            avatar: 'images/reikage.jpg',
            specialties: ['Bảo mật Web', 'Khai thác nhị phân', 'Dịch ngược'],
            socials: { github: 'https://github.com/', twitter: 'https://twitter.com/' }
        }
    ],
    achievements: [
        {
            title: 'Top 10 Đội CTF Việt Nam',
            description: 'Xếp hạng trong top 10 đội CTF toàn quốc trên CTFtime',
            year: 2024,
            type: 'ranking'
        },
        {
            title: 'Tham gia DUCTF 2024',
            description: 'Tham gia Down Under CTF 2024 với kết quả ấn tượng',
            year: 2024,
            type: 'event'
        },
        {
            title: 'Workshop Bảo mật',
            description: 'Tổ chức các buổi workshop và đào tạo bảo mật cho sinh viên',
            year: 2023,
            type: 'workshop'
        },
        {
            title: 'Nghiên cứu Bảo mật',
            description: 'Công bố các nghiên cứu bảo mật và phân tích lỗ hổng',
            year: 2023,
            type: 'research'
        }
    ],
    writeups: [
        {
            title: 'WannaGame 2025 - Freex',
            category: 'Web3',
            author: 'ReiKage',
            date: '2025',
            description: 'Khai thác lỗi logic trong hợp đồng DeFi Exchange để rút cạn tiền bằng token giả.',
            content: `
<h3>Lời nói đầu</h3>
<p>Chào các bạn, hôm nay mình sẽ chia sẻ chi tiết cách mình và team đã "xử đẹp" bài <strong>Freex</strong> trong giải WannaGame 2025 vừa rồi. Đây là một bài Smart Contract khá thú vị về lỗi logic trong việc quản lý trạng thái (state) của hợp đồng. Cảm giác khi tìm ra bug này đúng kiểu "Eureka!" luôn ấy.</p>

<h3>1. Phân tích & Reconnaissance (Trinh sát)</h3>
<p>Đầu tiên, Ban tổ chức cho mình một cái Source Code của Smart Contract <code>Exchange.sol</code>. Nhiệm vụ là phải rút hết tiền (WannaETH/OneETH) trong cái sàn này.</p>
<p>Mình bắt đầu đọc code và chú ý đến 2 hàm quan trọng nhất:</p>
<ul>
    <li><code>exchangeToken(address token, uint256 amount)</code>: Hàm này cho phép mình đổi token rác lấy <code>WannaETH</code>.</li>
    <li><code>deposit(address token, uint256 amount)</code>: Hàm này cho phép nạp token vào để làm thanh khoản (liquidity).</li>
</ul>

<h4>Phát hiện Lỗ hổng (The Bug)</h4>
<p>Khi mình đọc kỹ hàm <code>exchangeToken</code>, mình thấy nó có một cơ chế "ghi nợ" (liability).</p>
<ul>
    <li>Nếu token mình đưa vào không nằm trong whitelist, sàn vẫn cho mình nhận <code>WannaETH</code> <strong>nhưng</strong> nó sẽ ghi lại là mình đang "nợ" sàn số token đó.</li>
</ul>
<pre><code class="language-solidity">
// Đoạn code gây lú
balances[msg.sender] += amount; // Cộng tiền ảo WannaETH
liabilities[msg.sender][token] += amount; // Ghi nợ token rác
</code></pre>
<p>Sau đó, mình ngó sang hàm <code>deposit</code>. Bình thường, nếu mình nạp tiền vào, hệ thống phải kiểm tra xem mình có đang nợ nần gì không để trừ nợ chứ đúng không? Nhưng <strong>KHÔNG</strong>!</p>
<p>Hàm <code>deposit</code> chỉ đơn thuần là:</p>
<ol>
    <li>Nhận token từ ví mình chuyển vào.</li>
    <li>Cập nhật số dư token của mình trong sàn.</li>
    <li><strong>Nó hoàn toàn quên mất việc kiểm tra hay trừ cái <code>liabilities</code> kia!</strong></li>
</ol>
<p>=> <strong>Ý tưởng:</strong> Mình có thể "vay" tiền của sàn (lấy WannaETH), bị ghi nợ, sau đó "trả lại" số token đó qua đường <code>deposit</code>. Sàn sẽ nghĩ là mình nạp tiền mới vào, trong khi mình vẫn giữ nguyên cục <code>WannaETH</code> đã vay. Thế là lãi to!</p>

<h3>2. Lên kịch bản khai thác (Exploitation Strategy)</h3>
<p>Để thực hiện cú lừa này, mình cần các bước sau:</p>
<ol>
    <li><strong>Chuẩn bị công cụ:</strong> Mình cần một cái "Fake Token" (Token giả) do mình tự tạo ra. Tại sao? Vì mình cần số lượng lớn để swap và mình phải là chủ sở hữu để <code>mint</code> bao nhiêu tùy thích.</li>
    <li><strong>Bước 1 - Vay tiền (Tạo nợ):</strong>
        <ul>
            <li>Gọi <code>exchangeToken(FakeToken, 15 ETH)</code>.</li>
            <li>Sàn sẽ đưa mình 15 <code>WannaETH</code>.</li>
            <li>Sàn ghi sổ: "Thằng ReiKage nợ 15 FakeToken".</li>
        </ul>
    </li>
    <li><strong>Bước 2 - Trả nợ giả (Xóa dấu vết):</strong>
        <ul>
            <li>Gọi <code>deposit(FakeToken, 15 ETH)</code>.</li>
            <li>Mình chuyển trả 15 FakeToken cho sàn.</li>
            <li>Sàn cập nhật: "Thằng ReiKage vừa nạp 15 FakeToken, số dư FakeToken của nó là 0". (Nó không hề trừ cái nợ ở bước 1).</li>
        </ul>
    </li>
    <li><strong>Bước 3 - Rút tiền thật:</strong>
        <ul>
            <li>Lúc này mình đang có 15 <code>WannaETH</code> trong tay (từ bước 1).</li>
            <li>Gọi <code>claimReceivedWannaETH()</code> để đổi 15 <code>WannaETH</code> này thành tiền thật (OneETH) và chuồn lẹ.</li>
        </ul>
    </li>
</ol>

<h3>3. Viết Tool & Script</h3>
<p>Mình sử dụng Python và thư viện <code>web3.py</code> để viết script tự động. Dưới đây là chi tiết từng phần:</p>

<h4>Script khai thác (<code>solve.py</code>)</h4>
<pre><code class="language-python">
from web3 import Web3
import json

# ... (Setup connection) ...

# Bước 1: Approve cho sàn được phép tiêu FakeToken của mình
amount = w3.to_wei(15, 'ether')
fake_token.functions.approve(exchange_address, amount).transact({'from': account_address})

# Bước 2: Gọi exchangeToken để lấy WannaETH và tạo nợ
print(">>> Đang gọi exchangeToken...")
exchange.functions.exchangeToken(fake_token_address, amount).transact({'from': account_address})

# Bước 3: Gọi deposit để "trả lại" token nhưng không bị trừ nợ
print(">>> Đang gọi deposit để lừa contract...")
exchange.functions.deposit(fake_token_address, amount).transact({'from': account_address})

# Bước 4: Rút tiền thật về ví
print(">>> Rút tiền (Cash out)...")
exchange.functions.claimReceivedWannaETH().transact({'from': account_address})
</code></pre>

<p><strong>Flag:</strong> <code>W1{HEre_fOr_Y0U_the_fReEEX-CH4LI3NgE-Fl@G889c}</code></p>
            `
        },
        {
            title: 'WannaGame 2025 - WickedCraft',
            category: 'Web3',
            author: 'ReiKage',
            date: '2025',
            description: 'Dịch ngược một trình thông dịch bytecode tùy chỉnh trong hợp đồng Solidity để thực thi mã tùy ý.',
            content: `
<h3>Lời nói đầu</h3>
<p>Đây là một bài Reverse Engineering (Dịch ngược) trên nền tảng Smart Contract khá là "khoai". Thay vì tìm lỗi logic thông thường, chúng ta phải đối mặt với một cái <strong>Custom Virtual Machine (VM)</strong> được viết bằng Solidity. Tưởng tượng như người ta viết một ngôn ngữ lập trình riêng, rồi bắt mình hack nó vậy. Nhưng mà "khó quá thì bỏ qua" không có trong từ điển của team mình, nên chiến thôi!</p>

<h3>1. Phân tích & Reconnaissance</h3>
<p>Đề bài cho một contract tên là <code>Aggregator</code>. Nhìn vào hàm <code>swap(bytes memory data)</code>, mình thấy nó nhận vào một chuỗi bytes dài ngoằng và xử lý nó trong một vòng lặp <code>while</code>.</p>
<p>Đây chính là dấu hiệu của một trình thông dịch bytecode (Interpreter). Nhiệm vụ của mình là phải hiểu từng cái <code>action</code> (opcode) nó làm cái gì.</p>

<h4>Giải mã Bytecode (Reverse Engineering)</h4>
<p>Sau một hồi ngồi đọc code và debug bằng <code>remix</code> hoặc <code>hardhat</code>, mình đã map được các opcode quan trọng:</p>
<ul>
    <li><strong>Header (76 bytes đầu):</strong> Chứa các thông tin cấu hình như vị trí bắt đầu lệnh, vị trí output, deadline... Cái này quan trọng lắm, sai một byte là revert ngay.</li>
    <li><strong>Action 0 (CALL):</strong> Đây là "trùm cuối". Nó thực hiện lệnh <code>call</code> low-level tới một địa chỉ bất kỳ.
        <ul>
            <li>Cấu trúc: <code>[ActionID (1 byte)] ... [Target Address Offset] ...</code></li>
            <li>Nguy hiểm ở chỗ: Nó <strong>không kiểm tra</strong> địa chỉ đích là ai. Mình có thể bảo nó gọi tới bất cứ đâu!</li>
        </ul>
    </li>
    <li><strong>Action 4 (MULTICALL):</strong> Cho phép thực hiện nhiều lệnh cùng lúc.</li>
</ul>

<h3>2. Chiến thuật tấn công (Exploitation Strategy)</h3>
<p>Mục tiêu của mình là lấy tiền từ contract <code>WannaCoin</code>. Contract <code>Aggregator</code> (cái VM này) có quyền điều khiển tiền hoặc là owner của <code>WannaCoin</code>.</p>
<p>Ý tưởng là: <strong>Soạn một đoạn bytecode độc hại, gửi cho <code>Aggregator</code> chạy. Đoạn code này sẽ ra lệnh cho <code>Aggregator</code> gọi hàm <code>transfer</code> của <code>WannaCoin</code> để chuyển hết tiền về ví mình.</strong></p>
<p>Các bước cụ thể:</p>
<ol>
    <li><strong>Tính toán Offsets:</strong> Cái VM này dùng memory offset (địa chỉ bộ nhớ) rất nhiều. Mình phải tính toán chính xác xem địa chỉ của <code>WannaCoin</code> nằm ở byte thứ bao nhiêu trong payload, lệnh <code>transfer</code> nằm ở đâu.</li>
    <li><strong>Xây dựng Header:</strong> Tạo 76 bytes đầu tiên thật chuẩn để VM không bị crash (Out of Bounds).</li>
    <li><strong>Inject Action 0:</strong> Chèn lệnh CALL vào.
        <ul>
            <li>Target: Địa chỉ <code>WannaCoin</code>.</li>
            <li>Data: <code>abi.encodeWithSignature("transfer(address,uint256)", player, balance)</code>.</li>
        </ul>
    </li>
</ol>

<h3>3. Viết Tool & Script</h3>
<p>Phần này cần sự tỉ mỉ cao độ. Sai 1 byte là đi tong. Mình dùng Python để thao tác với bytes cho dễ.</p>

<h4>Script tạo Payload (<code>solve_wicked.py</code>)</h4>
<pre><code class="language-python">
# ... (Setup) ...

def construct_payload(target_address, player_address):
    # Khởi tạo mảng bytes rỗng
    B = bytearray(512)
    
    # --- 1. Xây dựng Header ---
    cmd_start = 0x60 
    B[0:2] = (cmd_start - 2).to_bytes(2, 'big')
    
    # --- 2. Chèn dữ liệu Call ---
    target_addr_offset = 0x100 
    target_bytes = bytes.fromhex(target_address[2:])
    B[target_addr_offset : target_addr_offset + 20] = target_bytes
    
    # --- 3. Soạn lệnh Action 0 (CALL) ---
    cursor = cmd_start
    B[cursor] = 0 # Opcode 0: CALL
    B[cursor+8] = (target_addr_offset + 68).to_bytes(2, 'big')
    
    return bytes(B)

print(">>> Gửi payload vào hàm swap...")
aggregator.functions.swap(payload).transact({'from': my_address})
</code></pre>

<p><strong>Flag:</strong> <code>W1{THIS-1s_wIcKeDCraft-CHAlL3nge_fLAG5060}</code></p>
            `
        },
        {
            title: 'WannaGame 2025 - Trust',
            category: 'Web',
            author: 'ReiKage',
            date: '2025',
            description: 'Bypass cơ chế kiểm soát truy cập của Nginx bằng cách tái sử dụng SSL Session để truy cập API quản trị nội bộ.',
            content: `
<h3>Lời nói đầu</h3>
<p>Bài này thuộc thể loại Web Security nhưng lại đụng chạm khá sâu đến cấu hình Server (Nginx) và giao thức SSL/TLS. Nếu bạn chỉ quen exploit SQL Injection hay XSS thì bài này sẽ hơi lạ lẫm một chút, nhưng hiểu rồi thì thấy nó cực kỳ logic và thực tế.</p>

<h3>1. Phân tích & Reconnaissance</h3>
<p>Đề bài cho mình 2 cái domain:</p>
<ul>
    <li><code>public.trustboundary.local</code>: Trang này cho phép truy cập bình thường nếu mình có Client Certificate (mTLS).</li>
    <li><code>employee.trustboundary.local</code>: Trang nội bộ, chứa flag hoặc API quan trọng. Nhưng cứ vào là bị ăn lỗi <code>403 Forbidden</code> ngay lập tức, kể cả khi đã dùng Certificate xịn.</li>
</ul>

<h4>Tại sao lại bị chặn?</h4>
<p>Mình đoán là cấu hình Nginx nó kiểu như này:</p>
<pre><code class="language-nginx">
server {
    server_name public.trustboundary.local;
    ssl_verify_client on; # Yêu cầu cert
}

server {
    server_name employee.trustboundary.local;
    ssl_verify_client on;
    deny all; # Chặn hết
}
</code></pre>
<p>Tuy nhiên, có một tính năng của SSL/TLS gọi là <strong>Session Resumption</strong> (Tái sử dụng phiên).</p>
<ul>
    <li>Khi bạn kết nối HTTPS lần đầu, quá trình bắt tay (Handshake) rất tốn kém.</li>
    <li>Để cho nhanh, Server sẽ cấp cho bạn một cái <code>Session ID</code>.</li>
    <li>Lần sau bạn kết nối lại, bạn chỉ cần chìa cái <code>Session ID</code> ra. Server thấy quen quen, check trong cache thấy hợp lệ thì <strong>bỏ qua các bước kiểm tra chứng thực nặng nề</strong> và cho vào luôn.</li>
</ul>
<p>=> <strong>Lỗ hổng:</strong> Nếu Nginx cấu hình chung một bộ nhớ đệm Session (Session Cache) cho cả 2 server block (<code>public</code> và <code>employee</code>), thì mình có thể lấy "vé thông hành" ở cổng <code>public</code> rồi chạy sang cổng <code>employee</code> chìa ra để vào!</p>

<h3>2. Chiến thuật tấn công (Exploitation Strategy)</h3>
<p>Kịch bản tấn công "đi cửa sau" như sau:</p>
<ol>
    <li><strong>Bước 1 - Lấy vé:</strong> Kết nối tới <code>public.trustboundary.local</code> đàng hoàng, dùng cert và key được cấp. Sau khi kết nối thành công, mình lưu lại cái <code>SSL Session ID</code>.</li>
    <li><strong>Bước 2 - Đi cửa sau:</strong> Mở một kết nối mới tới <code>employee.trustboundary.local</code>.
        <ul>
            <li><strong>Quan trọng:</strong> Trong lúc bắt tay (Handshake), mình ép Client gửi cái <code>Session ID</code> vừa lấy được ở bước 1.</li>
        </ul>
    </li>
    <li><strong>Bước 3 - Bypass:</strong> Nginx check thấy Session ID này hợp lệ (do <code>public</code> cấp), nó khôi phục phiên làm việc và <strong>bỏ qua</strong> cái đoạn check quyền truy cập gắt gao của <code>employee</code>. Thế là mình vào được!</li>
    <li><strong>Bước 4 - RCE:</strong> Sau khi bypass, mình gọi vào API <code>/api/plugins/upload</code> để up con shell và lấy flag.</li>
</ol>

<h3>3. Viết Tool & Script</h3>
<p>Mình dùng Python với thư viện <code>ssl</code> và <code>socket</code> chuẩn để có thể can thiệp sâu vào quá trình handshake.</p>

<h4>Script khai thác (<code>solve_trust.py</code>)</h4>
<pre><code class="language-python">
import ssl
import socket

# ... (Setup context) ...

print(">>> Bước 1: Kết nối tới Public để lấy Session ID...")
sock1 = socket.create_connection((TARGET_IP, PORT))
conn1 = context.wrap_socket(sock1, server_hostname="public.trustboundary.local")
session_ticket = conn1.session
conn1.close()

print(">>> Bước 2: Dùng lại Session ID để vào Employee...")
sock2 = socket.create_connection((TARGET_IP, PORT))

# MAGIC HAPPENS HERE: Truyền tham số session=session_ticket
conn2 = context.wrap_socket(sock2, 
                            server_hostname="employee.trustboundary.local", 
                            session=session_ticket)

print("[+] Kết nối thành công tới Employee! Đang gửi request...")
# ... (Send HTTP Request) ...
</code></pre>

<p><strong>Flag:</strong> <code>W1{C3rt5_m34n-NOThINg_W1thOuT-Pr0p3R_uSAg3_PL5_T4k3_lt-In_mInd11}</code></p>
            `
        }
    ]
};

// --- Chinese Data ---
const teamData_zh = {
    skills: [
        { name: 'Web 安全', icon: 'fa-globe' },
        { name: 'Pwn/二进制利用', icon: 'fa-bomb' },
        { name: '逆向工程', icon: 'fa-cogs' },
        { name: '取证分析', icon: 'fa-search' },
        { name: '密码学', icon: 'fa-key' },
        { name: '隐写术', icon: 'fa-eye' },
        { name: '杂项', icon: 'fa-puzzle-piece' }
    ],
    members: [
        {
            name: 'BaoZ',
            handle: 'BaoZ',
            role: '团队负责人 / 取证专家',
            bio: '数字取证和事件响应专家',
            email: 'bao25807700008@hutech.edu.vn',
            avatar: 'images/BaoZ.jpg',
            specialties: ['取证分析', '数字分析', '事件响应'],
            socials: { github: 'https://github.com/', twitter: 'https://twitter.com/' }
        },
        {
            name: 'ReiKage',
            handle: 'ReiKage',
            role: 'Web 安全 / Pwn',
            bio: 'Web 漏洞和二进制利用专家',
            email: 'anh25807700004@hutech.edu.vn',
            avatar: 'images/reikage.jpg',
            specialties: ['Web 安全', '二进制利用', '逆向工程'],
            socials: { github: 'https://github.com/', twitter: 'https://twitter.com/' }
        }
    ],
    achievements: [
        {
            title: '越南 CTF 战队前 10 名',
            description: '在 CTFtime 上排名前 10 的全国 CTF 战队',
            year: 2024,
            type: 'ranking'
        },
        {
            title: '参加 DUCTF 2024',
            description: '参加 Down Under CTF 2024 并取得优异成绩',
            year: 2024,
            type: 'event'
        },
        {
            title: '本地安全研讨会',
            description: '为学生组织网络安全研讨会和培训',
            year: 2023,
            type: 'workshop'
        },
        {
            title: '安全研究',
            description: '发布安全研究和漏洞分析',
            year: 2023,
            type: 'research'
        }
    ],
    writeups: [
        {
            title: 'WannaGame 2025 - Freex',
            category: 'Web3',
            author: 'ReiKage',
            date: '2025',
            description: '利用 DeFi 交易所合约中的逻辑错误，使用假代币耗尽资金。',
            content: `
<h3>前言</h3>
<p>大家好，今天我将详细分享我和我的团队如何在最近的 WannaGame 2025 中“搞定” <strong>Freex</strong> 挑战。这是一个非常有趣的智能合约挑战，涉及状态管理的逻辑错误。找到这个 Bug 的感觉真是“Eureka!”。</p>

<h3>1. 分析与侦察</h3>
<p>首先，组织者给了我们一个名为 <code>Exchange.sol</code> 的智能合约源代码。任务是耗尽该交易所中的所有资金（WannaETH/OneETH）。</p>
<p>我开始阅读代码，并关注两个最重要的函数：</p>
<ul>
    <li><code>exchangeToken(address token, uint256 amount)</code>: 此函数允许用垃圾代币交换 <code>WannaETH</code>。</li>
    <li><code>deposit(address token, uint256 amount)</code>: 此函数允许存入代币以提供流动性。</li>
</ul>

<h4>发现漏洞 (The Bug)</h4>
<p>当我仔细阅读 <code>exchangeToken</code> 函数时，我注意到了一个“债务”机制。</p>
<ul>
    <li>如果我提供的代币不在白名单中，交易所仍然允许我接收 <code>WannaETH</code>，<strong>但是</strong>它会记录我“欠”交易所该数量的代币。</li>
</ul>
<pre><code class="language-solidity">
// 令人困惑的代码
balances[msg.sender] += amount; // 增加虚拟 WannaETH
liabilities[msg.sender][token] += amount; // 记录垃圾代币债务
</code></pre>
<p>然后我看了看 <code>deposit</code> 函数。通常，如果我存钱，系统应该检查我是否有债务要扣除，对吧？但<strong>没有</strong>！</p>
<p><code>deposit</code> 函数仅仅是：</p>
<ol>
    <li>从我的钱包接收代币。</li>
    <li>更新我在交易所的代币余额。</li>
    <li><strong>它完全忘记了检查或扣除那个 <code>liabilities</code>！</strong></li>
</ol>
<p>=> <strong>思路：</strong> 我可以从交易所“借”钱（获得 WannaETH），被记录为债务人，然后通过 <code>deposit</code> “偿还”该代币数量。交易所会认为我存入了新资金，而我仍然保留着借来的 <code>WannaETH</code>。血赚！</p>

<h3>2. 利用策略</h3>
<p>为了实施这个骗局，我需要以下步骤：</p>
<ol>
    <li><strong>准备工具：</strong> 我需要一个自己创建的“假代币”。为什么？因为我需要大量代币进行交换，而且我必须是所有者才能随意 <code>mint</code>。</li>
    <li><strong>步骤 1 - 借款（制造债务）：</strong>
        <ul>
            <li>调用 <code>exchangeToken(FakeToken, 15 ETH)</code>。</li>
            <li>交易所给我 15 <code>WannaETH</code>。</li>
            <li>交易所记录：“ReiKage 欠 15 FakeToken”。</li>
        </ul>
    </li>
    <li><strong>步骤 2 - 假偿还（掩盖踪迹）：</strong>
        <ul>
            <li>调用 <code>deposit(FakeToken, 15 ETH)</code>。</li>
            <li>我将 15 FakeToken 转回交易所。</li>
            <li>交易所更新：“ReiKage 刚刚存入 15 FakeToken，他的 FakeToken 余额为 0”。（它没有扣除步骤 1 中的债务）。</li>
        </ul>
    </li>
    <li><strong>步骤 3 - 提现：</strong>
        <ul>
            <li>现在我手头有 15 <code>WannaETH</code>（来自步骤 1）。</li>
            <li>调用 <code>claimReceivedWannaETH()</code> 将这 15 <code>WannaETH</code> 兑换成真钱（OneETH）并跑路。</li>
        </ul>
    </li>
</ol>

<h3>3. 工具与脚本</h3>
<p>我使用 Python 和 <code>web3.py</code> 库编写了自动化脚本。详情如下：</p>

<h4>利用脚本 (<code>solve.py</code>)</h4>
<pre><code class="language-python">
from web3 import Web3
import json

# ... (设置连接) ...

# 步骤 1: 批准交易所使用我的 FakeToken
amount = w3.to_wei(15, 'ether')
fake_token.functions.approve(exchange_address, amount).transact({'from': account_address})

# 步骤 2: 调用 exchangeToken 获取 WannaETH 并制造债务
print(">>> 正在调用 exchangeToken...")
exchange.functions.exchangeToken(fake_token_address, amount).transact({'from': account_address})

# 步骤 3: 调用 deposit 以“归还”代币但不清除债务
print(">>> 正在调用 deposit 欺骗合约...")
exchange.functions.deposit(fake_token_address, amount).transact({'from': account_address})

# 步骤 4: 提取真钱
print(">>> 提现 (Cash out)...")
exchange.functions.claimReceivedWannaETH().transact({'from': account_address})
</code></pre>

<p><strong>Flag:</strong> <code>W1{HEre_fOr_Y0U_the_fReEEX-CH4LI3NgE-Fl@G889c}</code></p>
            `
        },
        {
            title: 'WannaGame 2025 - WickedCraft',
            category: 'Web3',
            author: 'ReiKage',
            date: '2025',
            description: '逆向工程 Solidity 合约中的自定义字节码解释器以执行任意调用。',
            content: `
<h3>前言</h3>
<p>这是一个智能合约平台上的逆向工程挑战，相当“棘手”。我们面对的不是常见的逻辑错误，而是一个用 Solidity 编写的<strong>自定义虚拟机 (VM)</strong>。想象一下，有人写了自己的编程语言并让我们去破解它。但在我们团队的字典里没有“太难了，放弃”这个词，所以开战吧！</p>

<h3>1. 分析与侦察</h3>
<p>挑战提供了一个名为 <code>Aggregator</code> 的合约。查看 <code>swap(bytes memory data)</code> 函数，我看到它接收一个长字节串并在 <code>while</code> 循环中处理它。</p>
<p>这是字节码解释器的标志。我的任务是理解每个 <code>action</code> (操作码) 做什么。</p>

<h4>字节码解码 (逆向工程)</h4>
<p>坐下来阅读代码并使用 <code>remix</code> 或 <code>hardhat</code> 调试后，我映射了重要的操作码：</p>
<ul>
    <li><strong>Header (前 76 字节):</strong> 包含配置信息，如起始位置、输出位置、截止日期... 这非常重要，错一个字节就会立即回滚。</li>
    <li><strong>Action 0 (CALL):</strong> 这是“最终 Boss”。它执行对任意地址的低级 <code>call</code>。
        <ul>
            <li>结构: <code>[ActionID (1 byte)] ... [Target Address Offset] ...</code></li>
            <li>危险之处: 它<strong>不检查</strong>目标地址是谁。我可以让它调用任何地方！</li>
        </ul>
    </li>
    <li><strong>Action 4 (MULTICALL):</strong> 允许同时执行多个命令。</li>
</ul>

<h3>2. 利用策略</h3>
<p>我的目标是从 <code>WannaCoin</code> 合约中取钱。<code>Aggregator</code> 合约（这个 VM）有权控制资金或者是 <code>WannaCoin</code> 的所有者。</p>
<p>思路是：<strong>编写一个恶意字节码，发送给 <code>Aggregator</code> 运行。这段代码将命令 <code>Aggregator</code> 调用 <code>WannaCoin</code> 的 <code>transfer</code> 函数，将所有资金转入我的钱包。</strong></p>
<p>具体步骤：</p>
<ol>
    <li><strong>计算偏移量：</strong> 这个 VM 大量使用内存偏移量。我必须精确计算 <code>WannaCoin</code> 地址在 payload 中的字节位置，以及 <code>transfer</code> 命令的位置。</li>
    <li><strong>构建 Header：</strong> 完美创建前 76 个字节，以免 VM 崩溃（越界）。</li>
    <li><strong>注入 Action 0：</strong> 插入 CALL 命令。
        <ul>
            <li>目标: <code>WannaCoin</code> 地址。</li>
            <li>数据: <code>abi.encodeWithSignature("transfer(address,uint256)", player, balance)</code>。</li>
        </ul>
    </li>
</ol>

<h3>3. 工具与脚本</h3>
<p>这部分需要高度精确。错一个字节就完了。我使用 Python 来轻松操作字节。</p>

<h4>Payload 生成脚本 (<code>solve_wicked.py</code>)</h4>
<pre><code class="language-python">
# ... (设置) ...

def construct_payload(target_address, player_address):
    # 初始化空字节数组
    B = bytearray(512)
    
    # --- 1. 构建 Header ---
    cmd_start = 0x60 
    B[0:2] = (cmd_start - 2).to_bytes(2, 'big')
    
    # --- 2. 插入调用数据 ---
    target_addr_offset = 0x100 
    target_bytes = bytes.fromhex(target_address[2:])
    B[target_addr_offset : target_addr_offset + 20] = target_bytes
    
    # --- 3. 编写 Action 0 (CALL) ---
    cursor = cmd_start
    B[cursor] = 0 # Opcode 0: CALL
    B[cursor+8] = (target_addr_offset + 68).to_bytes(2, 'big')
    
    return bytes(B)

print(">>> 发送 payload 到 swap 函数...")
aggregator.functions.swap(payload).transact({'from': my_address})
</code></pre>

<p><strong>Flag:</strong> <code>W1{THIS-1s_wIcKeDCraft-CHAlL3nge_fLAG5060}</code></p>
            `
        },
        {
            title: 'WannaGame 2025 - Trust',
            category: 'Web',
            author: 'ReiKage',
            date: '2025',
            description: '利用 SSL 会话复用绕过 Nginx 访问控制，访问内部管理 API。',
            content: `
<h3>前言</h3>
<p>这个挑战属于 Web 安全类别，但深入涉及服务器配置 (Nginx) 和 SSL/TLS 协议。如果你只习惯于利用 SQL 注入或 XSS，这可能会有点陌生，但一旦理解，它就非常合乎逻辑且实用。</p>

<h3>1. 分析与侦察</h3>
<p>挑战给了我们 2 个域名：</p>
<ul>
    <li><code>public.trustboundary.local</code>: 如果我有客户端证书 (mTLS)，此页面允许正常访问。</li>
    <li><code>employee.trustboundary.local</code>: 内部页面，包含 Flag 或重要 API。但即使使用有效证书，访问它也会立即导致 <code>403 Forbidden</code> 错误。</li>
</ul>

<h4>为什么被阻止？</h4>
<p>我猜 Nginx 配置大概是这样的：</p>
<pre><code class="language-nginx">
server {
    server_name public.trustboundary.local;
    ssl_verify_client on; # 需要证书
}

server {
    server_name employee.trustboundary.local;
    ssl_verify_client on;
    deny all; # 阻止所有
}
</code></pre>
<p>但是，有一个 SSL/TLS 功能叫做 <strong>会话恢复 (Session Resumption)</strong>。</p>
<ul>
    <li>当你第一次通过 HTTPS 连接时，握手过程非常昂贵。</li>
    <li>为了加速，服务器会发给你一个 <code>Session ID</code>。</li>
    <li>下次连接时，你只需出示该 <code>Session ID</code>。服务器看到它很眼熟，检查缓存，发现有效，就会<strong>跳过繁重的身份验证检查</strong>并让你进入。</li>
</ul>
<p>=> <strong>漏洞：</strong> 如果 Nginx 为两个服务器块（<code>public</code> 和 <code>employee</code>）配置了共享的会话缓存 (Session Cache)，我可以在 <code>public</code> 门口拿到“通行证”，然后跑到 <code>employee</code> 门口出示它进去！</p>

<h3>2. 利用策略</h3>
<p>“走后门”攻击场景如下：</p>
<ol>
    <li><strong>步骤 1 - 获取门票：</strong> 使用颁发的证书和密钥正常连接到 <code>public.trustboundary.local</code>。连接成功后，我保存 <code>SSL Session ID</code>。</li>
    <li><strong>步骤 2 - 使用后门：</strong> 打开到 <code>employee.trustboundary.local</code> 的新连接。
        <ul>
            <li><strong>重要：</strong> 在握手期间，我强制客户端发送步骤 1 中获取的 <code>Session ID</code>。</li>
        </ul>
    </li>
    <li><strong>步骤 3 - 绕过：</strong> Nginx 看到此 Session ID 有效（由 <code>public</code> 颁发），它恢复会话并<strong>跳过</strong> <code>employee</code> 的严格访问检查。所以我进去了！</li>
    <li><strong>步骤 4 - RCE：</strong> 绕过后，我调用 API <code>/api/plugins/upload</code> 上传 shell 并获取 Flag。</li>
</ol>

<h3>3. 工具与脚本</h3>
<p>我使用 Python 和标准 <code>ssl</code> 和 <code>socket</code> 库来深入干预握手过程。</p>

<h4>利用脚本 (<code>solve_trust.py</code>)</h4>
<pre><code class="language-python">
import ssl
import socket

# ... (设置上下文) ...

print(">>> 步骤 1: 连接到 Public 获取 Session ID...")
sock1 = socket.create_connection((TARGET_IP, PORT))
conn1 = context.wrap_socket(sock1, server_hostname="public.trustboundary.local")
session_ticket = conn1.session
conn1.close()

print(">>> 步骤 2: 复用 Session ID 访问 Employee...")
sock2 = socket.create_connection((TARGET_IP, PORT))

# 奇迹发生在这里: 传递 session=session_ticket
conn2 = context.wrap_socket(sock2, 
                            server_hostname="employee.trustboundary.local", 
                            session=session_ticket)

print("[+] 连接 Employee 成功！正在发送请求...")
# ... (发送 HTTP 请求) ...
</code></pre>

<p><strong>Flag:</strong> <code>W1{C3rt5_m34n-NOThINg_W1thOuT-Pr0p3R_uSAg3_PL5_T4k3_lt-In_mInd11}</code></p>
            `
        }
    ]
};

// --- Russian Data ---
const teamData_ru = {
    skills: [
        { name: 'Web-безопасность', icon: 'fa-globe' },
        { name: 'Pwn/Эксплуатация бинарных уязвимостей', icon: 'fa-bomb' },
        { name: 'Обратная разработка', icon: 'fa-cogs' },
        { name: 'Компьютерная криминалистика', icon: 'fa-search' },
        { name: 'Криптография', icon: 'fa-key' },
        { name: 'Стеганография', icon: 'fa-eye' },
        { name: 'Разное (Misc)', icon: 'fa-puzzle-piece' }
    ],
    members: [
        {
            name: 'BaoZ',
            handle: 'BaoZ',
            role: 'Руководитель команды / Специалист по форензике',
            bio: 'Эксперт в области цифровой криминалистики и реагирования на инциденты',
            email: 'bao25807700008@hutech.edu.vn',
            avatar: 'images/BaoZ.jpg',
            specialties: ['Форензика', 'Цифровой анализ', 'Реагирование на инциденты'],
            socials: { github: 'https://github.com/', twitter: 'https://twitter.com/' }
        },
        {
            name: 'ReiKage',
            handle: 'ReiKage',
            role: 'Web-безопасность / Pwn',
            bio: 'Специалист по веб-уязвимостям и эксплуатации бинарных файлов',
            email: 'anh25807700004@hutech.edu.vn',
            avatar: 'images/reikage.jpg',
            specialties: ['Web-безопасность', 'Эксплуатация бинарных файлов', 'Обратная разработка'],
            socials: { github: 'https://github.com/', twitter: 'https://twitter.com/' }
        }
    ],
    achievements: [
        {
            title: 'Топ-10 CTF команд Вьетнама',
            description: 'Входит в топ-10 национальных CTF команд на CTFtime',
            year: 2024,
            type: 'ranking'
        },
        {
            title: 'Участие в DUCTF 2024',
            description: 'Участвовали в Down Under CTF 2024 с отличными результатами',
            year: 2024,
            type: 'event'
        },
        {
            title: 'Локальные семинары по безопасности',
            description: 'Организация семинаров и тренингов по кибербезопасности для студентов',
            year: 2023,
            type: 'workshop'
        },
        {
            title: 'Исследования в области безопасности',
            description: 'Публикация исследований безопасности и анализа уязвимостей',
            year: 2023,
            type: 'research'
        }
    ],
    writeups: [
        {
            title: 'WannaGame 2025 - Freex',
            category: 'Web3',
            author: 'ReiKage',
            date: '2025',
            description: 'Эксплуатация логической ошибки в контракте DeFi Exchange для вывода средств с использованием поддельного токена.',
            content: `
<h3>Введение</h3>
<p>Всем привет, сегодня я подробно расскажу, как я и моя команда "разнесли" задачу <strong>Freex</strong> на недавнем WannaGame 2025. Это довольно интересная задача на Smart Contract про логическую ошибку в управлении состоянием (state). Ощущение, когда находишь этот баг, — это настоящее "Эврика!".</p>

<h3>1. Анализ и Разведка</h3>
<p>Сначала организаторы дали нам исходный код смарт-контракта под названием <code>Exchange.sol</code>. Задача состояла в том, чтобы вывести все средства (WannaETH/OneETH) с этой биржи.</p>
<p>Я начал читать код и сосредоточился на двух самых важных функциях:</p>
<ul>
    <li><code>exchangeToken(address token, uint256 amount)</code>: Эта функция позволяет обменивать мусорные токены на <code>WannaETH</code>.</li>
    <li><code>deposit(address token, uint256 amount)</code>: Эта функция позволяет вносить токены для обеспечения ликвидности.</li>
</ul>

<h4>Баг (The Bug)</h4>
<p>Когда я внимательно читал функцию <code>exchangeToken</code>, я заметил механизм "обязательств" (liability).</p>
<ul>
    <li>Если токен, который я предоставляю, не находится в белом списке, биржа все равно позволяет мне получить <code>WannaETH</code>, <strong>НО</strong> она записывает, что я "должен" бирже это количество токенов.</li>
</ul>
<pre><code class="language-solidity">
// Запутанный код
balances[msg.sender] += amount; // Добавляем виртуальный WannaETH
liabilities[msg.sender][token] += amount; // Записываем долг мусорного токена
</code></pre>
<p>Затем я посмотрел на функцию <code>deposit</code>. Обычно, если я вношу деньги, система должна проверить, есть ли у меня долги, чтобы их списать, верно? Но <strong>НЕТ</strong>!</p>
<p>Функция <code>deposit</code> просто:</p>
<ol>
    <li>Принимает токены с моего кошелька.</li>
    <li>Обновляет мой баланс токенов на бирже.</li>
    <li><strong>Она полностью забывает проверить или списать этот <code>liabilities</code>!</strong></li>
</ol>
<p>=> <strong>Идея:</strong> Я могу "одолжить" деньги у биржи (получить WannaETH), записаться в должники, а затем "вернуть" это количество токенов через <code>deposit</code>. Биржа подумает, что я вношу новые средства, в то время как я все еще держу <code>WannaETH</code>, которые я одолжил. Огромная прибыль!</p>

<h3>2. Стратегия эксплуатации</h3>
<p>Чтобы провернуть эту аферу, мне нужны следующие шаги:</p>
<ol>
    <li><strong>Подготовка:</strong> Мне нужен "Fake Token", созданный мной. Зачем? Потому что мне нужно большое количество для обмена, и я должен быть владельцем, чтобы <code>mint</code> (чеканить) сколько угодно.</li>
    <li><strong>Шаг 1 - Займ (Создание долга):</strong>
        <ul>
            <li>Вызвать <code>exchangeToken(FakeToken, 15 ETH)</code>.</li>
            <li>Биржа дает мне 15 <code>WannaETH</code>.</li>
            <li>Биржа записывает: "ReiKage должен 15 FakeToken".</li>
        </ul>
    </li>
    <li><strong>Шаг 2 - Фальшивый возврат (Заметание следов):</strong>
        <ul>
            <li>Вызвать <code>deposit(FakeToken, 15 ETH)</code>.</li>
            <li>Я перевожу 15 FakeToken обратно на биржу.</li>
            <li>Биржа обновляет: "ReiKage только что внес 15 FakeToken, его баланс FakeToken равен 0". (Она не списывает долг из Шага 1).</li>
        </ul>
    </li>
    <li><strong>Шаг 3 - Вывод средств:</strong>
        <ul>
            <li>Теперь у меня на руках 15 <code>WannaETH</code> (из Шага 1).</li>
            <li>Вызвать <code>claimReceivedWannaETH()</code>, чтобы обменять эти 15 <code>WannaETH</code> на реальные деньги (OneETH) и сбежать.</li>
        </ul>
    </li>
</ol>

<h3>3. Инструмент и Скрипт</h3>
<p>Я использовал Python и библиотеку <code>web3.py</code> для написания автоматического скрипта. Вот детали:</p>

<h4>Скрипт эксплойта (<code>solve.py</code>)</h4>
<pre><code class="language-python">
from web3 import Web3
import json

# ... (Настройка соединения) ...

# Шаг 1: Разрешить бирже тратить мой FakeToken
amount = w3.to_wei(15, 'ether')
fake_token.functions.approve(exchange_address, amount).transact({'from': account_address})

# Шаг 2: Вызвать exchangeToken, чтобы получить WannaETH и создать долг
print(">>> Вызов exchangeToken...")
exchange.functions.exchangeToken(fake_token_address, amount).transact({'from': account_address})

# Шаг 3: Вызвать deposit, чтобы обмануть контракт
print(">>> Вызов deposit для обмана контракта...")
exchange.functions.deposit(fake_token_address, amount).transact({'from': account_address})

# Шаг 4: Вывод реальных денег
print(">>> Вывод средств (Cash out)...")
exchange.functions.claimReceivedWannaETH().transact({'from': account_address})
</code></pre>

<p><strong>Флаг:</strong> <code>W1{HEre_fOr_Y0U_the_fReEEX-CH4LI3NgE-Fl@G889c}</code></p>
            `
        },
        {
            title: 'WannaGame 2025 - WickedCraft',
            category: 'Web3',
            author: 'ReiKage',
            date: '2025',
            description: 'Обратная разработка пользовательского интерпретатора байт-кода в контракте Solidity для выполнения произвольных вызовов.',
            content: `
<h3>Введение</h3>
<p>Это задача на обратную разработку (Reverse Engineering) на платформе Smart Contract, которая довольно "крепкий орешек". Вместо поиска обычных логических ошибок мы сталкиваемся с <strong>Пользовательской Виртуальной Машиной (VM)</strong>, написанной на Solidity. Представьте, что кто-то написал свой собственный язык программирования и попросил нас взломать его. Но "слишком сложно, сдаюсь" нет в словаре нашей команды, так что в бой!</p>

<h3>1. Анализ и Разведка</h3>
<p>Задача предоставляет контракт под названием <code>Aggregator</code>. Глядя на функцию <code>swap(bytes memory data)</code>, я вижу, что она принимает длинную строку байтов и обрабатывает ее в цикле <code>while</code>.</p>
<p>Это признак интерпретатора байт-кода. Моя задача — понять, что делает каждое <code>action</code> (опкод).</p>

<h4>Декодирование байт-кода (Reverse Engineering)</h4>
<p>Посидев за чтением кода и отладкой с помощью <code>remix</code> или <code>hardhat</code>, я составил карту важных опкодов:</p>
<ul>
    <li><strong>Header (Первые 76 байт):</strong> Содержит информацию о конфигурации, такую как начальная позиция, позиция вывода, дедлайн... Это очень важно, один неверный байт — и все сразу откатывается (revert).</li>
    <li><strong>Action 0 (CALL):</strong> Это "финальный босс". Он выполняет низкоуровневый <code>call</code> на любой адрес.
        <ul>
            <li>Структура: <code>[ActionID (1 байт)] ... [Смещение целевого адреса] ...</code></li>
            <li>Опасность: Он <strong>не проверяет</strong>, кто является целевым адресом. Я могу приказать ему позвонить куда угодно!</li>
        </ul>
    </li>
    <li><strong>Action 4 (MULTICALL):</strong> Позволяет выполнять несколько команд одновременно.</li>
</ul>

<h3>2. Стратегия эксплуатации</h3>
<p>Моя цель — забрать деньги из контракта <code>WannaCoin</code>. Контракт <code>Aggregator</code> (эта VM) имеет право управлять средствами или является владельцем <code>WannaCoin</code>.</p>
<p>Идея такова: <strong>Составить вредоносный байт-код, отправить его в <code>Aggregator</code> для запуска. Этот код прикажет <code>Aggregator</code> вызвать функцию <code>transfer</code> контракта <code>WannaCoin</code>, чтобы перевести все средства на мой кошелек.</strong></p>
<p>Конкретные шаги:</p>
<ol>
    <li><strong>Расчет смещений:</strong> Эта VM часто использует смещения памяти. Я должен точно рассчитать, на каком байте находится адрес <code>WannaCoin</code> в полезной нагрузке (payload), и где находится команда <code>transfer</code>.</li>
    <li><strong>Сборка Header:</strong> Создать первые 76 байт идеально, чтобы VM не упала (Out of Bounds).</li>
    <li><strong>Внедрение Action 0:</strong> Вставить команду CALL.
        <ul>
            <li>Цель: Адрес <code>WannaCoin</code>.</li>
            <li>Данные: <code>abi.encodeWithSignature("transfer(address,uint256)", player, balance)</code>.</li>
        </ul>
    </li>
</ol>

<h3>3. Инструмент и Скрипт</h3>
<p>Эта часть требует высокой точности. Один неверный байт — и все пропало. Я использовал Python для легкой манипуляции байтами.</p>

<h4>Скрипт генерации Payload (<code>solve_wicked.py</code>)</h4>
<pre><code class="language-python">
# ... (Настройка) ...

def construct_payload(target_address, player_address):
    # Инициализация пустого массива байтов
    B = bytearray(512)
    
    # --- 1. Сборка Header ---
    cmd_start = 0x60 
    B[0:2] = (cmd_start - 2).to_bytes(2, 'big')
    
    # --- 2. Вставка данных вызова ---
    target_addr_offset = 0x100 
    target_bytes = bytes.fromhex(target_address[2:])
    B[target_addr_offset : target_addr_offset + 20] = target_bytes
    
    # --- 3. Составление Action 0 (CALL) ---
    cursor = cmd_start
    B[cursor] = 0 # Опкод 0: CALL
    B[cursor+8] = (target_addr_offset + 68).to_bytes(2, 'big')
    
    return bytes(B)

print(">>> Отправка payload в функцию swap...")
aggregator.functions.swap(payload).transact({'from': my_address})
</code></pre>

<p><strong>Флаг:</strong> <code>W1{THIS-1s_wIcKeDCraft-CHAlL3nge_fLAG5060}</code></p>
            `
        },
        {
            title: 'WannaGame 2025 - Trust',
            category: 'Web',
            author: 'ReiKage',
            date: '2025',
            description: 'Обход контроля доступа Nginx с использованием повторного использования SSL-сессии для доступа к внутреннему административному API.',
            content: `
<h3>Введение</h3>
<p>Эта задача относится к категории Web Security, но довольно глубоко затрагивает конфигурацию сервера (Nginx) и протоколы SSL/TLS. Если вы привыкли эксплуатировать только SQL Injection или XSS, это может показаться немного странным, но как только вы поймете, это станет чрезвычайно логичным и практичным.</p>

<h3>1. Анализ и Разведка</h3>
<p>Задача дает нам 2 домена:</p>
<ul>
    <li><code>public.trustboundary.local</code>: Эта страница разрешает нормальный доступ, если у меня есть клиентский сертификат (mTLS).</li>
    <li><code>employee.trustboundary.local</code>: Внутренняя страница, содержит флаг или важный API. Но доступ к ней немедленно приводит к ошибке <code>403 Forbidden</code>, даже с действительным сертификатом.</li>
</ul>

<h4>Почему доступ заблокирован?</h4>
<p>Я предполагаю, что конфигурация Nginx выглядит примерно так:</p>
<pre><code class="language-nginx">
server {
    server_name public.trustboundary.local;
    ssl_verify_client on; # Требует сертификат
}

server {
    server_name employee.trustboundary.local;
    ssl_verify_client on;
    deny all; # Блокировать все
}
</code></pre>
<p>Однако существует функция SSL/TLS, называемая <strong>Возобновление сессии (Session Resumption)</strong>.</p>
<ul>
    <li>Когда вы подключаетесь через HTTPS в первый раз, процесс рукопожатия (Handshake) очень затратен.</li>
    <li>Чтобы ускорить его, сервер выдает вам <code>Session ID</code>.</li>
    <li>В следующий раз, когда вы подключаетесь, вам просто нужно предъявить этот <code>Session ID</code>. Сервер видит, что он знаком, проверяет кэш, находит его действительным и <strong>пропускает тяжелые проверки аутентификации</strong>, позволяя вам войти.</li>
</ul>
<p>=> <strong>Уязвимость:</strong> Если Nginx настраивает общий кэш сессий (Session Cache) для обоих серверных блоков (<code>public</code> и <code>employee</code>), я могу получить "пропуск" на входе <code>public</code>, а затем побежать к входу <code>employee</code> и предъявить его, чтобы войти!</p>

<h3>2. Стратегия эксплуатации</h3>
<p>Сценарий атаки "через черный ход" выглядит следующим образом:</p>
<ol>
    <li><strong>Шаг 1 - Получение билета:</strong> Подключиться к <code>public.trustboundary.local</code> должным образом, используя выданный сертификат и ключ. После успешного подключения я сохраняю <code>SSL Session ID</code>.</li>
    <li><strong>Шаг 2 - Использование черного хода:</strong> Открыть новое подключение к <code>employee.trustboundary.local</code>.
        <ul>
            <li><strong>Важно:</strong> Во время рукопожатия (Handshake) я заставляю клиента отправить <code>Session ID</code>, полученный на Шаге 1.</li>
        </ul>
    </li>
    <li><strong>Шаг 3 - Обход:</strong> Nginx видит, что этот Session ID действителен (выдан <code>public</code>), восстанавливает сессию и <strong>пропускает</strong> строгую проверку доступа <code>employee</code>. Так что я внутри!</li>
    <li><strong>Шаг 4 - RCE:</strong> После обхода я вызываю API <code>/api/plugins/upload</code>, чтобы загрузить шелл и получить флаг.</li>
</ol>

<h3>3. Инструмент и Скрипт</h3>
<p>Я использовал Python со стандартными библиотеками <code>ssl</code> и <code>socket</code>, чтобы глубоко вмешаться в процесс рукопожатия.</p>

<h4>Скрипт эксплойта (<code>solve_trust.py</code>)</h4>
<pre><code class="language-python">
import ssl
import socket

# ... (Настройка контекста) ...

print(">>> Шаг 1: Подключение к Public для получения Session ID...")
sock1 = socket.create_connection((TARGET_IP, PORT))
conn1 = context.wrap_socket(sock1, server_hostname="public.trustboundary.local")
session_ticket = conn1.session
conn1.close()

print(">>> Шаг 2: Повторное использование Session ID для доступа к Employee...")
sock2 = socket.create_connection((TARGET_IP, PORT))

# МАГИЯ ПРОИСХОДИТ ЗДЕСЬ: Передача session=session_ticket
conn2 = context.wrap_socket(sock2, 
                            server_hostname="employee.trustboundary.local", 
                            session=session_ticket)

print("[+] Подключение к Employee успешно! Отправка запроса...")
# ... (Отправка HTTP-запроса) ...
</code></pre>

<p><strong>Флаг:</strong> <code>W1{C3rt5_m34n-NOThINg_W1thOuT-Pr0p3R_uSAg3_PL5_T4k3_lt-In_mInd11}</code></p>
            `
        }
    ]
};

// --- Data Container ---
const allTeamData = {
    vi: teamData_vi,
    en: teamData_en,
    zh: teamData_zh,
    ru: teamData_ru
};

let currentTeamData = allTeamData.vi; // Default to Vietnamese

// --- Functions ---

let currentLang = 'vi'; // Default language code

function setTeamDataLanguage(lang) {
    currentLang = lang;
    if (allTeamData[lang]) {
        currentTeamData = allTeamData[lang];
    } else {
        currentTeamData = allTeamData.en; // Fallback
        currentLang = 'en';
    }
    
    // Reload all dynamic content
    loadSkills();
    loadAchievements();
    loadTeamMembers();
    loadWriteups();
    loadRankings();
    updateStats();
}

// Load data into the page
document.addEventListener('DOMContentLoaded', function() {
    // Initial load is handled by app.js or default
    // But we can ensure it loads here too
    loadSkills();
    loadAchievements();
    loadTeamMembers();
    loadWriteups();
    loadRankings();
    updateStats();
});

let currentYearFilter = '2025';

function loadRankings() {
    const container = document.getElementById('ctftime-stats');
    if (!container) return;

    const headers = {
        vi: {
            globalRank: 'Xếp hạng Thế giới', countryRank: 'Xếp hạng Quốc gia (VN)', ratingPoints: 'Điểm Rating',
            title2: 'Các Giải Đấu Đã Tham Gia',
            selectYear: 'Chọn Năm:'
        },
        en: {
            globalRank: 'Global Rank', countryRank: 'Country Rank (VN)', ratingPoints: 'Rating Points',
            title2: 'Tournament History',
            selectYear: 'Select Year:'
        },
        zh: {
            globalRank: '全球排名', countryRank: '国家排名 (VN)', ratingPoints: '评分',
            title2: '参赛历史',
            selectYear: '选择年份:'
        },
        ru: {
            globalRank: 'Мировой рейтинг', countryRank: 'Рейтинг страны (VN)', ratingPoints: 'Рейтинговые очки',
            title2: 'История турниров',
            selectYear: 'Выберите год:'
        }
    };

    const h = headers[currentLang] || headers.en;

    // Stats Cards
    let html = `
        <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px;">
            <div class="stat-card" style="background: rgba(0, 20, 40, 0.5); border: 1px solid #00ff88; padding: 20px; border-radius: 10px; text-align: center;">
                <h2 style="color: #00ff88; font-size: 2.5rem; margin: 0;">#N/A</h2>
                <p style="color: #888; margin-top: 10px; text-transform: uppercase; font-size: 0.9rem;">${h.globalRank} (2025)</p>
            </div>
            <div class="stat-card" style="background: rgba(0, 20, 40, 0.5); border: 1px solid #00ff88; padding: 20px; border-radius: 10px; text-align: center;">
                <h2 style="color: #00ff88; font-size: 2.5rem; margin: 0;">#55</h2>
                <p style="color: #888; margin-top: 10px; text-transform: uppercase; font-size: 0.9rem;">${h.countryRank}</p>
            </div>
            <div class="stat-card" style="background: rgba(0, 20, 40, 0.5); border: 1px solid #00ff88; padding: 20px; border-radius: 10px; text-align: center;">
                <h2 style="color: #00ff88; font-size: 2.5rem; margin: 0;">9.29</h2>
                <p style="color: #888; margin-top: 10px; text-transform: uppercase; font-size: 0.9rem;">${h.ratingPoints}</p>
            </div>
        </div>
    `;

    // Year Selector
    html += `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #00ff88; padding-bottom: 10px;">
            <h3 style="color: #00ff88; margin: 0; border-left: 4px solid #00ff88; padding-left: 10px;">${h.title2}</h3>
            <div>
                <label for="year-select" style="color: #fff; margin-right: 10px;">${h.selectYear}</label>
                <select id="year-select" onchange="filterRankingsByYear(this.value)" style="background: #001428; color: #00ff88; border: 1px solid #00ff88; padding: 5px 10px; border-radius: 5px;">
                    <option value="all" ${currentYearFilter === 'all' ? 'selected' : ''}>All</option>
                    <option value="2025" ${currentYearFilter === '2025' ? 'selected' : ''}>2025</option>
                </select>
            </div>
        </div>
    `;

    // Tournament Table
    html += `
        <div class="table-responsive" id="tournament-table-container">
            ${renderTournamentTable(currentYearFilter)}
        </div>
    `;

    container.innerHTML = html;
}

function renderTournamentTable(year) {
    const headers = {
        vi: { tournament: 'Giải đấu', rank: 'Thứ hạng', points: 'Điểm', rating: 'Điểm Rating' },
        en: { tournament: 'Tournament', rank: 'Rank', points: 'Points', rating: 'Rating Pts' },
        zh: { tournament: '锦标赛', rank: '排名', points: '分数', rating: '评分' },
        ru: { tournament: 'Турнир', rank: 'Место', points: 'Очки', rating: 'Рейтинг' }
    };
    const h = headers[currentLang] || headers.en;

    let filteredResults = tournamentResults;
    if (year !== 'all') {
        filteredResults = tournamentResults.filter(item => item.year == year);
    }

    let html = `
        <table class="table rankings-table" style="width: 100%; border-collapse: collapse; color: #fff;">
            <thead>
                <tr style="border-bottom: 1px solid #00ff88; color: #00ff88;">
                    <th style="padding: 10px; text-align: left;">${h.tournament}</th>
                    <th style="padding: 10px; text-align: center;">${h.rank}</th>
                    <th style="padding: 10px; text-align: center;">${h.points}</th>
                    <th style="padding: 10px; text-align: center;">${h.rating}</th>
                </tr>
            </thead>
            <tbody>
    `;

    if (filteredResults.length === 0) {
        html += `<tr><td colspan="4" style="padding: 20px; text-align: center; color: #888;">No data for this year</td></tr>`;
    } else {
        filteredResults.forEach(item => {
             html += `
                <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <td style="padding: 10px; text-align: left;">${item.tournament}</td>
                    <td style="padding: 10px; text-align: center;">#${item.rank}</td>
                    <td style="padding: 10px; text-align: center;">${item.points.toFixed(4)}</td>
                    <td style="padding: 10px; text-align: center;">${item.rating.toFixed(3)}</td>
                </tr>
            `;
        });
    }

    html += `
            </tbody>
        </table>
    `;
    return html;
}

function filterRankingsByYear(year) {
    currentYearFilter = year;
    const container = document.getElementById('tournament-table-container');
    if (container) {
        container.innerHTML = renderTournamentTable(year);
    }
}

function loadSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;
    
    let html = '';
    currentTeamData.skills.forEach(skill => {
        html += `
            <div class="skill-card">
                <i class="fas ${skill.icon}"></i>
                <h3>${skill.name}</h3>
            </div>
        `;
    });
    container.innerHTML = html;
}

function loadAchievements() {
    const container = document.getElementById('achievements-container');
    if (!container) return;
    
    let html = '';
    currentTeamData.achievements.slice(0, 3).forEach(achievement => {
        html += `
            <div class="achievement-card">
                <div class="achievement-icon">
                    <i class="fas fa-star"></i>
                </div>
                <h3>${achievement.title}</h3>
                <p>${achievement.description}</p>
                <span class="achievement-year">${achievement.year}</span>
            </div>
        `;
    });
    container.innerHTML = html;
}

function loadTeamMembers() {
    const container = document.getElementById('team-container');
    if (!container) {
        console.log('Team container not found');
        return;
    }
    
    let html = '';
    currentTeamData.members.forEach(member => {
        html += `
            <div class="member-card">
                <div class="member-header">
                    <div class="member-avatar">
                        <img src="${member.avatar}" alt="${member.name}" class="member-avatar-img" onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect fill=%22%2300ff88%22 width=%22120%22 height=%22120%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2240%22 fill=%22%230a0e27%22 text-anchor=%22middle%22 dy=%22.3em%22%3E${member.name.charAt(0)}%3C/text%3E%3C/svg%3E';">
                    </div>
                    <div class="member-info">
                        <h2>${member.name}</h2>
                        <p class="member-role">${member.role}</p>
                    </div>
                </div>
                <div class="member-content">
                    <p class="member-bio">${member.bio}</p>
                    ${member.email ? `<p class="member-contact"><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>` : ''}
                </div>
                ${member.specialties && member.specialties.length > 0 ? `
                <div class="member-skills">
                    ${member.specialties.map(spec => `<span class="skill-tag">${spec}</span>`).join('')}
                </div>
                ` : ''}
                <div class="member-socials">
                    ${member.socials.github ? `<a href="${member.socials.github}" target="_blank" title="GitHub"><i class="fab fa-github"></i></a>` : ''}
                    ${member.socials.twitter ? `<a href="${member.socials.twitter}" target="_blank" title="Twitter"><i class="fab fa-twitter"></i></a>` : ''}
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function updateStats() {
    const memberCount = document.getElementById('member-count');
    const achievementCount = document.getElementById('achievement-count');
    const skillCount = document.getElementById('skill-count');
    
    if (memberCount) memberCount.textContent = currentTeamData.members.length;
    if (achievementCount) achievementCount.textContent = currentTeamData.achievements.length;
    if (skillCount) skillCount.textContent = currentTeamData.skills.length;
}

function loadWriteups() {
    const container = document.getElementById('writeups-container');
    if (!container) return;
    
    let html = '';
    if (currentTeamData.writeups && currentTeamData.writeups.length > 0) {
        currentTeamData.writeups.forEach((writeup, index) => {
            html += `
                <div class="writeup-card">
                    <div class="writeup-header">
                        <span class="writeup-category">${writeup.category}</span>
                        <span class="writeup-date">${writeup.date}</span>
                    </div>
                    <h3>${writeup.title}</h3>
                    <p>${writeup.description}</p>
                    <div class="writeup-footer">
                        <span class="writeup-author"><i class="fas fa-user"></i> ${writeup.author}</span>
                        <button onclick="openWriteupModal(${index})" class="read-more-btn">Read More <i class="fas fa-arrow-right"></i></button>
                    </div>
                </div>
            `;
        });
    } else {
        html = `
            <div class="writeup-card">
                <h3>Coming Soon</h3>
                <p>We are preparing detailed write-ups of CTF challenges and security articles.</p>
            </div>
        `;
    }
    container.innerHTML = html;
}

// Modal Logic
function openWriteupModal(index) {
    const writeup = currentTeamData.writeups[index];
    if (!writeup) return;

    // Create modal if it doesn't exist
    let modal = document.getElementById('writeup-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'writeup-modal';
        modal.className = 'modal-overlay';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeWriteupModal()">&times;</button>
            <div class="modal-header">
                <span class="writeup-category">${writeup.category}</span>
                <h2>${writeup.title}</h2>
                <div class="modal-meta">
                    <span><i class="fas fa-user"></i> ${writeup.author}</span>
                    <span><i class="fas fa-calendar"></i> ${writeup.date}</span>
                </div>
            </div>
            <div class="modal-body">
                ${writeup.content || '<p>Content not available.</p>'}
            </div>
        </div>
    `;

    // Show modal
    setTimeout(() => modal.classList.add('active'), 10);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeWriteupModal() {
    const modal = document.getElementById('writeup-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.innerHTML = ''; // Clear content
        }, 300);
    }
    document.body.style.overflow = '';
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('writeup-modal');
    if (modal && e.target === modal) {
        closeWriteupModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeWriteupModal();
    }
});
