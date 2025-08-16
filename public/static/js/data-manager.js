// ===== Data Manager - Export/Import and Backup Functionality =====

class DataManager {
    constructor() {
        this.userId = this.getCurrentUserId();
    }

    getCurrentUserId() {
        return localStorage.getItem('github_master_user_id') || 'guest';
    }

    // Export user data to JSON file
    async exportToFile() {
        if (!confirm('学習データをJSONファイルとしてダウンロードしますか？')) {
            return;
        }

        try {
            this.showLoadingIndicator('データをエクスポート中...');
            
            // Get all user data from API
            const response = await fetch(`/api/user/${this.userId}/export`);
            if (!response.ok) {
                throw new Error('Failed to export data');
            }
            
            const result = await response.json();
            const exportData = result.data;
            
            // Create filename with timestamp
            const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
            const filename = `github-master-backup-${timestamp}.json`;
            
            // Create and download file
            const blob = new Blob([JSON.stringify(exportData, null, 2)], {
                type: 'application/json'
            });
            
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.hideLoadingIndicator();
            this.showSuccessMessage(`データを ${filename} としてダウンロードしました！`);
            
        } catch (error) {
            console.error('Export error:', error);
            this.hideLoadingIndicator();
            this.showErrorMessage('データのエクスポートに失敗しました。');
        }
    }

    // Import user data from JSON file
    async importFromFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = async (event) => {
            const file = event.target.files[0];
            if (!file) return;
            
            if (!confirm('選択したファイルから学習データを復元しますか？現在のデータは上書きされます。')) {
                return;
            }
            
            try {
                this.showLoadingIndicator('データをインポート中...');
                
                const text = await file.text();
                const importData = JSON.parse(text);
                
                // Validate data structure
                if (!this.validateImportData(importData)) {
                    throw new Error('Invalid data format');
                }
                
                // Import data via API
                await this.importDataToDatabase(importData);
                
                this.hideLoadingIndicator();
                this.showSuccessMessage('データの復元が完了しました！');
                
                // Refresh page to show updated data
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
                
            } catch (error) {
                console.error('Import error:', error);
                this.hideLoadingIndicator();
                this.showErrorMessage('データのインポートに失敗しました。ファイル形式を確認してください。');
            }
        };
        
        input.click();
    }

    // Generate QR code for data sharing
    async generateQRCode() {
        if (!confirm('学習データのQRコードを生成しますか？')) {
            return;
        }

        try {
            this.showLoadingIndicator('QRコードを生成中...');
            
            // Get user data
            const response = await fetch(`/api/user/${this.userId}/export`);
            if (!response.ok) {
                throw new Error('Failed to get data');
            }
            
            const result = await response.json();
            const exportData = result.data;
            
            // Compress data for QR code (simplified version)
            const compressedData = this.compressDataForQR(exportData);
            
            // Generate QR code URL (using a simple text-based method)
            const qrData = btoa(JSON.stringify(compressedData));
            const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`;
            
            this.hideLoadingIndicator();
            this.showQRCodeModal(qrUrl, qrData);
            
        } catch (error) {
            console.error('QR generation error:', error);
            this.hideLoadingIndicator();
            this.showErrorMessage('QRコードの生成に失敗しました。');
        }
    }

    // Generate shareable URL
    async generateShareURL() {
        if (!confirm('学習データの共有URLを作成しますか？')) {
            return;
        }

        try {
            this.showLoadingIndicator('共有URLを生成中...');
            
            // Get user data
            const response = await fetch(`/api/user/${this.userId}/export`);
            if (!response.ok) {
                throw new Error('Failed to get data');
            }
            
            const result = await response.json();
            const exportData = result.data;
            
            // Compress and encode data
            const compressedData = this.compressDataForQR(exportData);
            const dataString = btoa(JSON.stringify(compressedData));
            
            // Create shareable URL
            const shareUrl = `${window.location.origin}/?import=${encodeURIComponent(dataString)}`;
            
            this.hideLoadingIndicator();
            this.showShareURLModal(shareUrl);
            
        } catch (error) {
            console.error('Share URL generation error:', error);
            this.hideLoadingIndicator();
            this.showErrorMessage('共有URLの生成に失敗しました。');
        }
    }

    // Show data statistics
    async showDataStats() {
        try {
            this.showLoadingIndicator('統計データを取得中...');
            
            // Get user summary
            const response = await fetch(`/api/user/${this.userId}/summary`);
            if (!response.ok) {
                throw new Error('Failed to get stats');
            }
            
            const result = await response.json();
            const stats = result.data;
            
            this.hideLoadingIndicator();
            this.showDataStatsModal(stats);
            
        } catch (error) {
            console.error('Stats error:', error);
            this.hideLoadingIndicator();
            this.showErrorMessage('統計データの取得に失敗しました。');
        }
    }

    // Reset all user data
    async resetAllData() {
        if (!confirm('⚠️ 全ての学習データを削除しますか？この操作は取り消せません！')) {
            return;
        }
        
        if (!confirm('本当によろしいですか？進捗、クイズ結果、すべてのデータが失われます。')) {
            return;
        }

        try {
            this.showLoadingIndicator('データをリセット中...');
            
            // Clear local storage
            localStorage.removeItem('github_master_user_id');
            localStorage.clear();
            
            this.hideLoadingIndicator();
            this.showSuccessMessage('データのリセットが完了しました。ページを再読み込みします。');
            
            // Reload page
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            
        } catch (error) {
            console.error('Reset error:', error);
            this.hideLoadingIndicator();
            this.showErrorMessage('データのリセットに失敗しました。');
        }
    }

    // Validate imported data structure
    validateImportData(data) {
        const requiredFields = ['user_stats', 'export_timestamp', 'version'];
        return requiredFields.every(field => data.hasOwnProperty(field));
    }

    // Import data to database (simplified - in real app would use API)
    async importDataToDatabase(data) {
        // This is a simplified implementation
        // In a real application, you would send this data to your API
        console.log('Importing data:', data);
        
        // Store in localStorage for now
        localStorage.setItem('github_master_imported_data', JSON.stringify(data));
        
        return Promise.resolve();
    }

    // Compress data for QR code/URL sharing
    compressDataForQR(data) {
        // Return essential data only for QR codes
        return {
            stats: data.user_stats,
            lessons: data.user_progress?.length || 0,
            quizzes: data.quiz_results?.length || 0,
            timestamp: data.export_timestamp
        };
    }

    // Show QR Code Modal
    showQRCodeModal(qrUrl, qrData) {
        const modal = this.createModal('QRコード', `
            <div class="qr-modal-content">
                <img src="${qrUrl}" alt="QR Code" style="max-width: 300px; margin: 20px auto; display: block;">
                <p>このQRコードをスキャンして、他のデバイスにデータを移行できます。</p>
                <div style="margin-top: 20px;">
                    <button class="btn btn-primary" onclick="navigator.clipboard?.writeText('${qrData}').then(() => alert('データをクリップボードにコピーしました！'))">
                        <i class="fas fa-copy"></i> データをコピー
                    </button>
                </div>
            </div>
        `);
        
        document.body.appendChild(modal);
    }

    // Show Share URL Modal
    showShareURLModal(shareUrl) {
        const modal = this.createModal('共有URL', `
            <div class="share-modal-content">
                <p>以下のURLを共有して、他のデバイスでデータを復元できます：</p>
                <div style="margin: 20px 0;">
                    <textarea readonly style="width: 100%; height: 100px; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">${shareUrl}</textarea>
                </div>
                <div>
                    <button class="btn btn-primary" onclick="navigator.clipboard?.writeText('${shareUrl}').then(() => alert('URLをクリップボードにコピーしました！'))">
                        <i class="fas fa-copy"></i> URLをコピー
                    </button>
                </div>
            </div>
        `);
        
        document.body.appendChild(modal);
    }

    // Show Data Stats Modal
    showDataStatsModal(stats) {
        const modal = this.createModal('データ統計', `
            <div class="stats-modal-content">
                <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0;">
                    <div class="stat-card">
                        <h4>総合進捗</h4>
                        <div class="stat-value">${stats.overall_progress || 0}%</div>
                    </div>
                    <div class="stat-card">
                        <h4>学習時間</h4>
                        <div class="stat-value">${Math.round((stats.total_study_time || 0) / 60)}分</div>
                    </div>
                    <div class="stat-card">
                        <h4>達成バッジ</h4>
                        <div class="stat-value">${stats.achievements_count || 0}個</div>
                    </div>
                    <div class="stat-card">
                        <h4>連続学習</h4>
                        <div class="stat-value">${stats.streak_days || 0}日</div>
                    </div>
                </div>
                <div class="quiz-scores" style="margin: 20px 0;">
                    <h4>クイズスコア</h4>
                    <div style="display: flex; gap: 20px; justify-content: center;">
                        <div>基本: ${stats.quiz_scores?.basic || 0}%</div>
                        <div>コマンド: ${stats.quiz_scores?.commands || 0}%</div>
                        <div>ワークフロー: ${stats.quiz_scores?.workflow || 0}%</div>
                    </div>
                </div>
            </div>
        `);
        
        document.body.appendChild(modal);
    }

    // Create modal element
    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <span class="close">&times;</span>
                <h3 style="margin-bottom: 20px;">${title}</h3>
                ${content}
                <div style="margin-top: 30px; text-align: center;">
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">閉じる</button>
                </div>
            </div>
        `;
        
        // Add close functionality
        modal.querySelector('.close').onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
        
        return modal;
    }

    // Show loading indicator
    showLoadingIndicator(message) {
        const existing = document.getElementById('loading-indicator');
        if (existing) existing.remove();
        
        const loader = document.createElement('div');
        loader.id = 'loading-indicator';
        loader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            color: white;
            font-size: 18px;
        `;
        loader.innerHTML = `
            <div style="text-align: center;">
                <div style="margin-bottom: 20px;">
                    <i class="fas fa-spinner fa-spin" style="font-size: 2em;"></i>
                </div>
                <div>${message}</div>
            </div>
        `;
        
        document.body.appendChild(loader);
    }

    // Hide loading indicator
    hideLoadingIndicator() {
        const loader = document.getElementById('loading-indicator');
        if (loader) loader.remove();
    }

    // Show success message
    showSuccessMessage(message) {
        this.showToast(message, 'success');
    }

    // Show error message
    showErrorMessage(message) {
        this.showToast(message, 'error');
    }

    // Show toast notification
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            animation: slideInRight 0.3s ease;
        `;
        
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            info: '#17a2b8'
        };
        
        toast.style.background = colors[type] || colors.info;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'}-circle" style="margin-right: 8px;"></i>
            ${message}
        `;
        
        document.body.appendChild(toast);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }

    // Auto-backup functionality (every 5 minutes)
    startAutoBackup() {
        setInterval(async () => {
            try {
                const response = await fetch(`/api/user/${this.userId}/export`);
                if (response.ok) {
                    const result = await response.json();
                    localStorage.setItem('github_master_auto_backup', JSON.stringify({
                        data: result.data,
                        timestamp: Date.now()
                    }));
                    console.log('Auto backup completed');
                }
            } catch (error) {
                console.error('Auto backup failed:', error);
            }
        }, 5 * 60 * 1000); // 5 minutes
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    .stat-card {
        text-align: center;
        padding: 20px;
        background: #f8f9fa;
        border-radius: 8px;
        border: 1px solid #e9ecef;
    }
    .stat-card h4 {
        margin: 0 0 10px 0;
        color: #495057;
        font-size: 14px;
    }
    .stat-value {
        font-size: 24px;
        font-weight: bold;
        color: #0366d6;
    }
`;
document.head.appendChild(style);

// Initialize data manager
const dataManager = new DataManager();

// Start auto-backup
dataManager.startAutoBackup();

// Check for import data in URL
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const importData = urlParams.get('import');
    
    if (importData) {
        try {
            const decoded = JSON.parse(atob(decodeURIComponent(importData)));
            if (confirm('URLからデータをインポートしますか？')) {
                dataManager.importDataToDatabase(decoded).then(() => {
                    alert('データのインポートが完了しました！');
                    window.location.href = window.location.pathname; // Remove query params
                });
            }
        } catch (error) {
            console.error('URL import error:', error);
        }
    }
});